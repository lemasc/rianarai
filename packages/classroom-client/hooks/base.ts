/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import useSWR, { SWRResponse } from "swr";
import { Map } from "immutable";

import { useAuth } from "@rianarai/ui-shared/context/auth";
import { usePlugin } from "@rianarai/ui-shared/context/plugin";

/**
 * Converts the array response into a ImmutableMap based on ids.
 */
function mapIds<T extends Record<string, any>>(
  response: T[],
  mapKey?: keyof T
): Map<string, T> {
  return Map<string, T>().withMutations((map) =>
    response.forEach((v) => map.set(v[mapKey ?? "id"], v))
  );
}

/**
 * Base SWR Hook. Use to fetch data from the RianArai Classroom API.
 *
 * Accepts 2 types. The first type is the result.
 * The second one is request data for processing using the afterRequest function.
 */
const useClassroomSWR = <Res, Req>(
  key: string | null,
  afterRequest?: (data: Req) => Res
) => {
  const { classroom, status } = usePlugin();
  const { metadata, ready, bundle } = useAuth();
  return useSWR<Res>(
    ready &&
      metadata &&
      status?.valid &&
      bundle &&
      classroom?.request !== undefined &&
      key
      ? key
      : null,
    async (key: string) => {
      const { data } = await classroom.request<Req>(key);
      return afterRequest ? afterRequest(data) : (data as unknown as Res);
    }
  );
};

/**
 * Results SWR Hook. Use to map the API data into a results map.
 */
export const useClassroomResult = <T>(
  key: string | null,
  mapKey?: keyof T
): SWRResponse<Map<string, T>> =>
  useClassroomSWR<Map<string, T>, T[]>(key, (res) => mapIds(res, mapKey));

/**
 * Contents SWR Hook. Use to retrieve both metadata and contents from the results map.
 */
export function useClassroomContent<T extends Record<string, any>>(
  key: string | null,
  contentId?: string,
  mapKey?: keyof T
) {
  const { classroom } = usePlugin();
  const swr = useClassroomResult<T>(key, mapKey);
  const contentSwr = useSWR(
    swr.data && key && contentId ? [key, contentId] : null,
    async (key, contentId) => {
      if (key && swr.data && swr.data.get(contentId) && classroom) {
        const content = await classroom.request<T>([key, contentId].join("/"));
        return Map<string, T>().set(contentId, {
          ...swr.data.get(contentId),
          ...content.data,
        });
      }
      return null;
    }
  );
  useEffect(() => {
    if (swr.data && contentId) {
      contentSwr.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId, swr.data, swr.mutate]);
  return contentId ? contentSwr : swr;
}
