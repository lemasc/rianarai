import { RealmContext } from "db/models";

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { RealmProvider } = RealmContext;
  return <RealmProvider>{children}</RealmProvider>;
}
