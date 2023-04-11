import { Redirect, useSearchParams } from "expo-router";
import { useState, useMemo } from "react";

export type WithObjectIdProps = {
  objectId: string;
  showFallback: () => void;
};

/**
 * A HOC that wraps a component and provides it with an ObjectId generated
 * from the `id` query parameter.
 *
 * If the `id` query parameter is not a valid ObjectId, the component will
 * be redirected to the `fallbackRoute`.
 */
export const WithObjectId = <P extends WithObjectIdProps>(
  Component: React.ComponentType<P>,
  { fallbackRoute }: { fallbackRoute: string }
): React.FC<P> => {
  return function WithIdParam(props: P) {
    const [showFallback, setShowFallback] = useState(false);

    const { id } = useSearchParams<{ id: string }>();

    const objectId = useMemo(
      () => (id ? Realm.BSON.ObjectId.createFromHexString(id) : undefined),
      [id]
    );
    return (
      <>
        {(!objectId || showFallback) && <Redirect href={fallbackRoute} />}
        {objectId && (
          <Component
            {...props}
            objectId={objectId}
            showFallback={() => setShowFallback(true)}
          />
        )}
      </>
    );
  };
};
