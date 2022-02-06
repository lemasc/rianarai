import fastify, { FastifyInstance, FastifyReply } from 'fastify'
import {
  CodeVerifierResults,
  OAuth2Client,
  GenerateAuthUrlOpts,
  CodeChallengeMethod,
} from 'google-auth-library'
import { Static, Type } from '@sinclair/typebox'
import { URLSearchParams } from 'url'
import { shell } from 'electron'
import { createReadStream } from 'fs'
import path from 'path'
import { GoogleScopes } from '@rianarai/classroom/types/auth'
import { BaseUser } from '@rianarai/classroom/core/base'
import { getAssetsDir } from '../helpers'

const SignInResponse = Type.Object(
  {
    error: Type.Optional(Type.String()),
    code: Type.Optional(Type.String()),
    state: Type.Optional(Type.String()),
    id_token: Type.Optional(Type.String()),
  },
  {
    additionalProperties: true,
  }
)

type StaticFileRoute = {
  name: string
  mime?: string
  useAppDir?: boolean
}

const routes: StaticFileRoute[] = [
  {
    name: 'favicon.ico',
    mime: 'image/x-icon',
    useAppDir: true,
  },
  {
    name: 'logo.svg',
    mime: 'image/svg+xml',
    useAppDir: true,
  },
  {
    name: 'index.css',
    mime: 'text/css',
  },
  {
    name: 'signin',
  },
  {
    name: 'signin/success',
  },
  {
    name: 'signin/error',
  },
]

type SavedPromise = {
  resolve: (value: BaseUser) => void
  reject: (reason: Error) => void
}

class DesktopSignInFlow {
  protected serverUrl?: string
  protected rootUrl: string
  constructor(rootUrl: string) {
    this.rootUrl = rootUrl
  }
  protected generateAuthUrl(opts: GenerateAuthUrlOpts) {
    if (opts.code_challenge_method && !opts.code_challenge) {
      throw new Error('If a code_challenge_method is provided, code_challenge must be included.')
    }
    opts.redirect_uri = this.serverUrl + '/signin/result'
    opts.response_type = opts.response_type || 'code'
    // Allow scopes to be passed either as array or a string
    if (opts.scope instanceof Array) {
      opts.scope = opts.scope.join(' ')
    }
    return this.rootUrl + '/auth?' + new URLSearchParams(opts as Record<string, string>).toString()
  }
}

export class GoogleSignIn extends DesktopSignInFlow {
  private server: FastifyInstance
  private codes: CodeVerifierResults
  private signInPromise?: SavedPromise

  constructor(rootUrl: string) {
    super(rootUrl)
  }

  private async readStaticFile(fileName: string, res: FastifyReply, useAppDir?: boolean) {
    try {
      const stream = createReadStream(
        path.resolve(__dirname, `${useAppDir ? getAssetsDir() : '../static'}/${fileName}`)
      )
      res.status(200).send(stream)
    } catch (err) {
      res.status(500).send()
    }
  }

  private resolveSignIn(data: BaseUser | Error) {
    if (!this.signInPromise) return
    if (data instanceof Error) {
      this.signInPromise.reject(data)
    } else {
      this.signInPromise.resolve(data)
    }
    this.signInPromise = undefined
    setTimeout(() => this.destroy(!(data instanceof Error)), 250)
  }

  private async createServer() {
    this.server = fastify()
    this.server.get('/signin/redirect', async (req, res) => {
      this.codes = await new OAuth2Client().generateCodeVerifierAsync()
      const authorizeUrl = this.generateAuthUrl({
        scope: [
          GoogleScopes.OPENID,
          GoogleScopes.PROFILE,
          GoogleScopes.EMAIL,
          GoogleScopes.CONTACTS,
          GoogleScopes.CLASSROOM_ANNOUNCEMENTS,
          GoogleScopes.CLASSROOM_COURSES,
          GoogleScopes.CLASSROOM_COURSEWORK,
          GoogleScopes.CLASSROOM_MATERIALS,
          GoogleScopes.CLASSROOM_PHOTOS,
          GoogleScopes.CLASSROOM_ROASTERS,
          GoogleScopes.CLASSROOM_SUBMISSIONS,
          GoogleScopes.CLASSROOM_TOPICS,
        ],
        code_challenge_method: CodeChallengeMethod.S256,
        code_challenge: this.codes.codeChallenge,
      })
      res.redirect(302, authorizeUrl)
    })
    routes.map(async (route) => {
      this.server.get(`/${route.name}`, async (req, res) => {
        res.header('Content-Type', route.mime ?? 'text/html; charset=utf-8')
        const fileName = route.name.includes('/') ? route.name.split('/')[1] : route.name
        this.readStaticFile(
          fileName.includes('.') ? fileName : `${fileName}.html`,
          res,
          route.useAppDir
        )
      })
    })

    this.server.get<{ Querystring: Static<typeof SignInResponse> }>(
      '/signin/result',
      {
        schema: {
          querystring: SignInResponse,
        },
      },
      async (req, res) => {
        res.header('Content-Type', 'text/html; charset=utf-8')
        try {
          if (req.query.error == 'access_denied') {
            throw new Error('Access Denied')
          }
          if (!req.query.code || !req.query.id_token) {
            throw new Error('Invalid Response')
          }
          res.redirect(302, '/signin/success')
          this.resolveSignIn({
            idToken: req.query.id_token,
            serverAuthCode: req.query.code,
            codeVerifier: this.codes.codeVerifier,
          })
        } catch (err) {
          console.error(err)
          res.redirect(302, '/signin/error')
          this.resolveSignIn(err)
        }
      }
    )
    this.serverUrl = await this.server.listen(0, '127.0.0.1')
  }
  async signIn(): Promise<BaseUser> {
    if (!this.server) await this.createServer()
    return new Promise((resolve, reject) => {
      this.signInPromise = { resolve, reject }
      shell.openExternal(this.serverUrl + '/signin')
    })
  }
  /**
   * Destroy the current sign-in operation.
   * @param force - If true, forcefully close the local server. The current URL will not be accessible.
   */
  async destroy(force?: boolean) {
    this.signInPromise?.reject(new Error('Destroyed.'))
    this.signInPromise = undefined
    this.codes = undefined
    if (force) {
      await this.server.close()
      this.server = undefined
    }
  }
  isSignningIn() {
    return this.signInPromise !== undefined
  }
}
