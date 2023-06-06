import { PortalProvider } from "@gorhom/portal";
import { AppProvider } from "@realm/react";
import { ENV } from "mobile/features/env";

import { AuthProvider } from "./auth";
import { DatabaseProvider } from "./db";
import { NativeBaseProvider } from "./nativebase";
import { NavigationThemeProvider } from "./navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NativeBaseProvider>
      <AppProvider id={ENV.realmAppId}>
        <AuthProvider>
          <DatabaseProvider>
            <NavigationThemeProvider>
              <PortalProvider>{children}</PortalProvider>
            </NavigationThemeProvider>
          </DatabaseProvider>
        </AuthProvider>
      </AppProvider>
    </NativeBaseProvider>
  );
}
