import { RealmContext } from "db/models";
import { SplashScreen } from "expo-router";
import { userStore } from "mobile/features/user";
import { useMemo } from "react";
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm";

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: "downloadBeforeOpen" as OpenRealmBehaviorType.DownloadBeforeOpen,
  timeOutBehavior: "openLocalRealm" as OpenRealmTimeOutBehavior.OpenLocalRealm,
  timeOut: 5000,
};

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { RealmProvider } = RealmContext;
  const user = userStore((state) => state.realmUser);
  const syncConfig: Partial<Realm.SyncConfiguration> | undefined = useMemo(
    () =>
      user
        ? {
            flexible: true,
            user,
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
            onError: (error) => console.error("SYNC ERROR", error),
          }
        : undefined,
    [user]
  );
  return (
    <RealmProvider sync={syncConfig} fallback={SplashScreen}>
      {children}
    </RealmProvider>
  );
}
