import { useRouter, useSegments } from "expo-router";
import { useExpoRouterContext } from "expo-router/src/hooks";
import { userStore } from "mobile/features/user";
import { useInitializeUser } from "mobile/features/user/initialize";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Sets up any authentication logic (restoring user from previous session, redirection to login page, etc.)
 */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useInitializeUser();
  const user = userStore((state) => state.realmUser);
  const segments = useSegments();
  const router = useRouter();

  const context = useExpoRouterContext();
  const [isNavigationReady, setReady] = useState(
    context.navigationRef.current?.isReady(),
  );
  const timeoutRef = useRef<NodeJS.Timeout>();

  const readyCheckCount = useRef(0);

  const checkIfNavigationIsReady = useCallback(() => {
    const ready = context.navigationRef.current?.isReady();
    if (ready) {
      setReady(true);
    } else if (readyCheckCount.current < 100) {
      readyCheckCount.current++;
      timeoutRef.current = setTimeout(() => {
        checkIfNavigationIsReady();
      }, 100);
    } else {
      throw new Error(
        "Cannot resolve navigation. This is probably an error in `Providers`.",
      );
    }
  }, []);

  useEffect(() => {
    if (!isNavigationReady) {
      checkIfNavigationIsReady();
    } else {
      console.log(`Navigation Ready in ${readyCheckCount.current * 100}ms`);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isNavigationReady]);

  const shouldRedirect: "app" | "auth" | undefined = useMemo(() => {
    const inAuthGroup = segments[0] === "auth";
    const inAppGroup = segments[0] === "app";
    if (inAuthGroup === undefined) return;
    if (!user && !inAuthGroup) {
      console.log("Should redirect to login page");
      return "auth";
    } else if (user && !inAppGroup) {
      return "app";
    }
  }, [user, segments]);

  useEffect(() => {
    if (isNavigationReady && shouldRedirect) {
      try {
        if (shouldRedirect === "app") {
          // Redirect away from the sign-in page.
          console.log("Should enter app");
          router.replace("/app");
        } else if (shouldRedirect === "auth") {
          console.log("Should redirect to login page");
          router.replace("/auth/signin");
        }
      } catch {
        console.log("Error redirecting based on user");
      }
    }
  }, [isNavigationReady, shouldRedirect]);

  return <>{children}</>;
};
