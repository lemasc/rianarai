import { AppProvider } from "@realm/react";
import { ENV } from "mobile/features/env";

import { AuthProvider } from "./auth";
import { DatabaseProvider } from "./db";
import { NativeBaseProvider } from "./nativebase";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NativeBaseProvider>
      <AppProvider id={ENV.realmAppId}>
        <AuthProvider>
          <DatabaseProvider>{children}</DatabaseProvider>
        </AuthProvider>
      </AppProvider>
    </NativeBaseProvider>
  );
}