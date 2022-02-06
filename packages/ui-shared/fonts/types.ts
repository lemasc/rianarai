export type FontMetadata = {
  family: string
  type: string
  weight: number
  location: string
}

export type FontConfig = {
  [family: string]: {
    [weight: number]: {
      [type: string]: string
    }
  }
}

export type FontImport = Record<string, string>
