import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { List, Map } from 'immutable'
import { KeyedMutator, SWRResponse } from 'swr'

import { StreamFeed, WorkFeed } from '../types'
import { useAnnoucement, useCourseWork, useMaterials } from '.'

/**
 * Convenient function to combine multiple SWR hooks.
 */
function useCombinedSWR<T extends Record<string, unknown>>(
  ...swr: SWRResponse<Map<string, never>>[]
): SWRResponse<List<T>> {
  const [isValidating, setIsValidating] = useState(false)

  useEffect(
    () => {
      setIsValidating(
        swr.reduce((cur, each) => each.isValidating || cur, false as boolean)
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    swr.map((each) => each.isValidating)
  )

  const [error, setError] = useState<any>()

  useEffect(
    () => {
      setError(swr.reduce((cur, each) => each.error ?? cur))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    swr.map((each) => each.error)
  )

  const [data, setData] = useState<List<T> | undefined>()

  useEffect(
    () => {
      setData(
        (
          List<T>()
            .concat(...swr.map((each) => each.data?.toList()))
            .filter((c) => c !== undefined) as List<T>
        ).sort((a, b) =>
          dayjs(a.creationTime as string).isBefore(b.creationTime as string)
            ? 1
            : -1
        )
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    swr.map((each) => each.data)
  )

  const mutateRef = useRef<KeyedMutator<List<T>>>()

  useEffect(
    () => {
      mutateRef.current = async () => {
        await Promise.all(swr.map(async (each) => await each.mutate()))
        return undefined
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    swr.map((each) => each.mutate)
  )

  return {
    isValidating,
    error,
    data,
    mutate: mutateRef.current as KeyedMutator<List<T>>
  }
}
export function useStreamFeed(id: string) {
  const announcements = useAnnoucement(id)
  const materials = useMaterials(id)
  const courseWork = useCourseWork(id)
  // @ts-expect-error Theses hooks are conditional. The content one can return nullable data, so ts error here.
  return useCombinedSWR<StreamFeed>(announcements, materials, courseWork)
}

export function useWorkFeed(id: string) {
  const materials = useMaterials(id)
  const courseWork = useCourseWork(id)
  // @ts-expect-error Theses hooks are conditional. The content one can return nullable data, so ts error here.
  return useCombinedSWR<WorkFeed>(materials, courseWork)
}
