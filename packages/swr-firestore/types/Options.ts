import { mutate } from 'swr'
import { Document } from './Document'

export type StaticMutateOptions = {
  /**
   * If you are using a custom cache provider, pass the mutate function returned from `useSWRConfig`.
   */
  mutator?: typeof mutate
  /**
   * If true, the local cache won't be updated. Default `false`.
   */
  ignoreLocalMutation?: boolean
}

export type FetchStaticOptions<Doc extends Document = Document> = {
  /**
   * If you are using a custom cache provider, pass the mutate function returned from `useSWRConfig`.
   */
  mutator?: typeof mutate
  /**
   * An array of key strings that indicate where there will be dates in the document.
   *
   * Example: if your dates are in the `lastUpdated` and `user.createdAt` fields, then pass `{parseDates: ["lastUpdated", "user.createdAt"]}`.
   *
   * This will automatically turn all Firestore dates into JS Date objects, removing the need to do `.toDate()` on your dates.
   */
  parseDates?: (string | keyof Omit<Doc, 'id' | 'exists' | 'hasPendingWrites' | '__snapshot'>)[]
  /**
   * If `true`, docs returned in `data` will not include the firestore `__snapshot` field. If `false`, it will include a `__snapshot` field. This lets you access the document snapshot, but makes the document not JSON serializable.
   *
   * Default: `true`
   */
  ignoreFirestoreDocumentSnapshotField?: boolean
}

export type FetchHookOptions<Doc extends Document = Document> = {
  /**
   * If `true`, sets up a real-time subscription to the Firestore backend.
   *
   * Default: `false`
   */
  listen?: boolean
} & Omit<FetchStaticOptions<Doc>, 'mutator'>
