/* eslint-disable @typescript-eslint/ban-types */
import useSWR, {
  useSWRConfig,
  mutate as globalMutate,
  SWRConfiguration
} from 'swr'
import { fuego } from '../context'
import { useRef, useEffect, useMemo, useCallback } from 'react'
import { empty } from '../helpers/empty'
import { collectionCache } from '../classes/Cache'

// type Document<T = {}> = T & { id: string }

import {
  FieldPath,
  OrderByDirection,
  WhereFilterOp
} from '@firebase/firestore-types'
import { isDev } from '../helpers/is-dev'
import { withDocumentDatesParsed } from '../helpers/doc-date-parser'
import { Document, FetchHookOptions, FetchStaticOptions } from '../types'
import {
  doc as _doc,
  collection,
  collectionGroup,
  onSnapshot,
  writeBatch,
  query,
  Constraints,
  getDocs
} from '../core/index'
import type {
  QueryConstraint,
  Query,
  DocumentData,
  Unsubscribe
} from '@firebase/firestore'

type KeyHack = string & {} // hack to also allow strings

// here we get the "key" from our data, to add intellisense for any "orderBy" in the queries and such.
type OrderByArray<Doc extends object = {}, Key = keyof Doc> = [
  Key | FieldPath | KeyHack,
  OrderByDirection
]
type OrderByItem<Doc extends object = {}, Key = keyof Doc> =
  | OrderByArray<Doc>
  | Key
  | KeyHack
type OrderByType<Doc extends object = {}> =
  | OrderByItem<Doc>
  | OrderByArray<Doc>[]

type WhereItem<Doc extends object = {}, Key = keyof Doc> = [
  Key | FieldPath | KeyHack,
  WhereFilterOp,
  unknown
]
type WhereArray<Doc extends object = {}> = WhereItem<Doc>[]
type WhereType<Doc extends object = {}> = WhereItem<Doc> | WhereArray<Doc>

export type CollectionQueryType<Doc extends object = {}> = {
  limit?: number
  orderBy?: OrderByType<Doc>
  where?: WhereType<Doc>
  isCollectionGroup?: boolean

  /**
   * For now, this can only be a number, since it has to be JSON serializable.
   *
   * **TODO** allow DocumentSnapshot here too. This will probably be used with a useStaticCollection hook in the future.
   */
  startAt?: number
  /**
   * For now, this can only be a number, since it has to be JSON serializable.
   *
   * **TODO** allow DocumentSnapshot here too. This will probably be used with a useStaticCollection hook in the future.
   */
  endAt?: number
  /**
   * For now, this can only be a number, since it has to be JSON serializable.
   *
   * **TODO** allow DocumentSnapshot here too. This will probably be used with a useStaticCollection hook in the future.
   */
  startAfter?: number
  /**
   * For now, this can only be a number, since it has to be JSON serializable.
   *
   * **TODO** allow DocumentSnapshot here too. This will probably be used with a useStaticCollection hook in the future.
   */
  endBefore?: number

  // THESE ARE NOT JSON SERIALIZABLE
  // startAt?: number | DocumentSnapshot
  // endAt?: number | DocumentSnapshot
  // startAfter?: number | DocumentSnapshot
  // endBefore?: number | DocumentSnapshot
}

export const getCollection = async <Doc extends Document = Document>(
  path: string,
  // queryString: string = '{}',
  query: CollectionQueryType<Doc> = {},
  {
    parseDates,
    ignoreFirestoreDocumentSnapshotField,
    mutator
  }: FetchStaticOptions = empty.object
) => {
  const ref = createFirestoreRef(path, query)
  const data: Doc[] = await getDocs(ref).then((querySnapshot) => {
    const array: typeof data = []
    const mutateStatic = mutator ?? globalMutate
    querySnapshot.forEach((doc) => {
      const docData: Record<string, any> =
        doc.data({
          serverTimestamps: 'estimate'
        }) ?? {}
      const docToAdd = withDocumentDatesParsed(
        {
          ...docData,
          id: doc.id,
          exists: doc.exists,
          hasPendingWrites: doc.metadata.hasPendingWrites,
          __snapshot: ignoreFirestoreDocumentSnapshotField ? undefined : doc
        } as any,
        parseDates
      )
      // update individual docs in the cache
      mutateStatic(doc.ref.path, docToAdd, false)
      if (isDev && (docData.exists || docData.id || docData.hasPendingWrites)) {
        console.warn(
          '[get-collection] warning: Your document, ',
          doc.id,
          ' is using one of the following reserved fields: [exists, id, hasPendingWrites]. These fields are reserved. Please remove them from your documents.'
        )
      }
      array.push(docToAdd)
    })
    return array
  })
  return data
}

const createFirestoreRef = <Doc extends object = {}>(
  path: string,
  options: CollectionQueryType<Doc>
) =>
  // { isCollectionGroup = false }: { isCollectionGroup?: boolean } = empty.object
  {
    let ref: Query<DocumentData> = collection(fuego.db, path)

    if (options.isCollectionGroup) {
      ref = collectionGroup(fuego.db, path)
    }

    const args: QueryConstraint[] = []

    Object.entries(options).map((option) => {
      // Ensure TypeScript typings will work.
      const key = option[0] as keyof CollectionQueryType<Doc>
      const value = option[1] as CollectionQueryType<Doc>[typeof key]

      if (key === 'isCollectionGroup') return

      const multipleConditions = (w: any): w is WhereArray<Doc> => {
        return !!(w as WhereArray) && Array.isArray(w[0])
      }

      const multipleOrderBy = (o: any): o is OrderByArray<Doc>[] => {
        return Array.isArray((o as OrderByArray<Doc>[])[0])
      }

      switch (key) {
        case 'where':
          if (multipleConditions(value)) {
            value.forEach((w) => {
              args.push(
                Constraints.where(w[0] as string | FieldPath, w[1], w[2])
              )
            })
          } else if (
            typeof value[0] === 'string' &&
            typeof value[1] === 'string'
          ) {
            args.push(
              Constraints.where(value[0], value[1] as WhereFilterOp, value[2])
            )
          }
          break
        case 'orderBy':
          if (typeof value === 'string') {
            args.push(Constraints.orderBy(value))
          } else if (Array.isArray(value)) {
            if (multipleOrderBy(value)) {
              value.forEach(([order, direction]) => {
                args.push(
                  Constraints.orderBy(order as string | FieldPath, direction)
                )
              })
            } else {
              const [order, direction] = value
              args.push(
                Constraints.orderBy(
                  order as string | FieldPath,
                  direction as OrderByDirection
                )
              )
            }
          }
          break
        default:
          if (!Constraints[key]) {
            console.warn(
              `[create-firestore-ref] - Received unknown query options : ${key}`
            )
          } else {
            args.push(Constraints[key](value as number))
          }
      }
    })

    return query(ref, ...args)
  }

type ListenerReturnType<Doc extends Document = Document> = {
  initialData: Doc[] | null
  unsubscribe: Unsubscribe
}

const createListenerAsync = async <Doc extends Document = Document>(
  path: string,
  queryString: string,
  {
    parseDates,
    ignoreFirestoreDocumentSnapshotField = true,
    mutator
  }: FetchStaticOptions
): Promise<ListenerReturnType<Doc>> => {
  return new Promise((resolve) => {
    const query: CollectionQueryType = JSON.parse(queryString) ?? {}
    const ref = createFirestoreRef(path, query)
    const unsubscribe = onSnapshot(
      ref,
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const data: Doc[] = []
        const mutateStatic = mutator ?? globalMutate
        querySnapshot.forEach((doc) => {
          const docData: Record<string, any> = doc.data({
            serverTimestamps: 'estimate'
          })
          const docToAdd = withDocumentDatesParsed(
            {
              ...docData,
              id: doc.id,
              exists: doc.exists,
              hasPendingWrites: doc.metadata.hasPendingWrites,
              __snapshot: ignoreFirestoreDocumentSnapshotField ? undefined : doc
            } as any,
            parseDates
          )
          if (
            isDev &&
            (docData.exists || docData.id || docData.hasPendingWrites)
          ) {
            console.warn(
              '[use-collection] warning: Your document, ',
              doc.id,
              ' is using one of the following reserved fields: [exists, id, hasPendingWrites]. These fields are reserved. Please remove them from your documents.'
            )
          }
          // update individual docs in the cache
          mutateStatic(doc.ref.path, docToAdd, false)
          data.push(docToAdd)
        })
        // resolve initial data
        resolve({
          initialData: data,
          unsubscribe
        })
        // update on listener fire
        mutateStatic([path, queryString], data, false)
      }
    )
  })
}

export type CollectionSWROptions<Doc extends Document = Document> =
  SWRConfiguration<Doc[] | null>
/**
 * Call a Firestore Collection
 * @template Doc
 * @param path String if the document is ready. If it's not ready yet, pass `null`, and the request won't start yet.
 * @param [query] - Dictionary with options to query the collection.
 * @param [options] - Dictionary with option `listen`. If true, it will open a socket listener. Also takes any of SWR's options.
 */
export const useCollection = <
  Data extends object = {},
  Doc extends Document = Document<Data>
>(
  path: string | null,
  query: CollectionQueryType<Data> & FetchHookOptions<Doc> = empty.object,
  options: CollectionSWROptions<Doc> = empty.object
) => {
  const unsubscribeRef = useRef<ListenerReturnType['unsubscribe'] | null>(null)

  const {
    where,
    endAt,
    endBefore,
    startAfter,
    startAt,
    orderBy,
    limit,
    listen = false,
    parseDates,
    isCollectionGroup,
    ignoreFirestoreDocumentSnapshotField = true
  } = query

  // if we're listening, the firestore listener handles all revalidation
  const {
    refreshInterval = listen ? 0 : undefined,
    refreshWhenHidden = listen ? false : undefined,
    refreshWhenOffline = listen ? false : undefined,
    revalidateOnFocus = listen ? false : undefined,
    revalidateOnReconnect = listen ? false : undefined,
    dedupingInterval = listen ? 0 : undefined
  } = options

  const swrOptions = {
    ...options,
    refreshInterval,
    refreshWhenHidden,
    refreshWhenOffline,
    revalidateOnFocus,
    revalidateOnReconnect,
    dedupingInterval
  }

  // why not just put this into the ref directly?
  // so that we can use the useEffect down below that triggers revalidate()
  const memoQueryString = useMemo(
    () =>
      JSON.stringify({
        where,
        endAt,
        endBefore,
        startAfter,
        startAt,
        orderBy,
        limit,
        isCollectionGroup
      }),
    [
      endAt,
      endBefore,
      isCollectionGroup,
      limit,
      orderBy,
      startAfter,
      startAt,
      where
    ]
  )

  // we move this to a Ref
  // why? because we shouldn't have to include it in the key
  // if we do, then calling mutate() won't be consistent for all
  // collections with the same path & query
  // TODO figure out if this is the right behavior...probably not because of the paths. hm.
  // TODO it's not, move this to the
  // const isCollectionGroupQuery = useRef(isCollectionGroup)
  // useEffect(() => {
  //   isCollectionGroupQuery.current = isCollectionGroup
  // }, [isCollectionGroup])

  const dateParser = useRef(parseDates)
  useEffect(() => {
    dateParser.current = parseDates
  }, [parseDates])

  // we move listen to a Ref
  // why? because we shouldn't have to include "listen" in the key
  // if we do, then calling mutate() won't be consistent for all
  // collections with the same path & query
  const shouldListen = useRef(listen)
  useEffect(() => {
    shouldListen.current = listen
  })

  const shouldIgnoreSnapshot = useRef(ignoreFirestoreDocumentSnapshotField)
  useEffect(() => {
    shouldIgnoreSnapshot.current = ignoreFirestoreDocumentSnapshotField
  }, [ignoreFirestoreDocumentSnapshotField])

  const { mutate: configMutate } = useSWRConfig()

  const swr = useSWR<Doc[] | null>(
    // if the path is null, this means we don't want to fetch yet.
    path === null ? null : [path, memoQueryString],
    async (path: string, queryString: string) => {
      if (shouldListen.current) {
        if (unsubscribeRef.current) {
          unsubscribeRef.current()
          unsubscribeRef.current = null
        }
        const { unsubscribe, initialData } = await createListenerAsync<Doc>(
          path,
          queryString,
          {
            parseDates: dateParser.current as never,
            ignoreFirestoreDocumentSnapshotField: shouldIgnoreSnapshot.current,
            mutator: configMutate
          }
        )
        unsubscribeRef.current = unsubscribe
        return initialData
      }

      const data = await getCollection<Doc>(
        path,
        JSON.parse(queryString) as CollectionQueryType<Doc>,
        {
          parseDates: dateParser.current as never,
          ignoreFirestoreDocumentSnapshotField: shouldIgnoreSnapshot.current,
          mutator: configMutate
        }
      )
      return data
    },
    swrOptions
  )

  // if listen or changes,
  // we run revalidate.
  // This triggers SWR to fetch again
  // Why? because we don't want to put listen
  // in the useSWR key. If we did, then we couldn't mutate
  // based on query alone. If we had useSWR(['users', true]),
  // but then a `users` fetch with `listen` set to `false` updated, it wouldn't mutate both.
  // thus, we move the `listen` and option to a ref user in `useSWR`,
  // and we call `revalidate` if it changes.
  const mounted = useRef(false)
  useEffect(() => {
    // TODO should this only happen if listen is false? No, BC swr should revalidate on a change.
    if (mounted.current) revalidateRef.current()
    else mounted.current = true
  }, [listen, configMutate])

  // this MUST be after the previous effect to avoid duplicate initial validations.
  // only happens on updates, not initial mounting
  const revalidateRef = useRef(swr.mutate)
  useEffect(() => {
    revalidateRef.current = swr.mutate
  })

  useEffect(() => {
    // TODO should this only be for listen, since SWR updates with the others?
    // also should it go before the useSWR?
    return () => {
      // clean up listener on unmount if it exists
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
    }
    // should depend on the path, queyr, and listen being the same...
  }, [path, listen, memoQueryString])

  // add the collection to the cache,
  // so that we can mutate it from document calls later
  useEffect(() => {
    if (path) collectionCache.addCollectionToCache(path, memoQueryString)
  }, [path, memoQueryString])

  const { data, isValidating, mutate, error } = swr

  /**
   * `add(data)`: Extends the Firestore document [`add` function](https://firebase.google.com/docs/firestore/manage-data/add-data).
   * - It also updates the local cache using SWR's `mutate`. This will prove highly convenient over the regular `add` function provided by Firestore.
   */
  const add = useCallback(
    (data: Data | Data[]) => {
      if (!path) return null

      const dataArray = Array.isArray(data) ? data : [data]

      const ref = collection(fuego.db, path)

      const docsToAdd: Doc[] = dataArray.map((doc) => ({
        ...doc,
        // generate IDs we can use that in the local cache that match the server
        id: _doc(ref).id
      })) as unknown as Doc[] // solve this annoying TS bug 😅

      // add to cache
      if (!listen) {
        // we only update the local cache if we don't have a listener set up
        // why? because Firestore automatically handles this part for subscriptions
        mutate((prevState) => {
          const state = prevState ?? empty.array
          return [...state, ...docsToAdd]
        }, false)
      }

      // add to network
      const batch = writeBatch(fuego.db)

      docsToAdd.forEach(({ id, ...doc }) => {
        // take the ID out of the document
        batch.set(_doc(ref, id), doc)
      })

      return batch.commit()
    },
    [listen, mutate, path]
  )

  return {
    data,
    isValidating,
    mutate,
    error,
    add,
    loading: !data && !error,
    /**
     * A function that, when called, unsubscribes the Firestore listener.
     *
     * The function can be null, so make sure to check that it exists before calling it.
     *
     * Note: This is not necessary to use. `useCollection` already unmounts the listener for you. This is only intended if you want to unsubscribe on your own.
     */
    unsubscribe: unsubscribeRef.current
  }
}
