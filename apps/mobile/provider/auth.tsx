import { useNavigation } from "@react-navigation/core";
import { SplashScreen, useRouter, useSegments } from "expo-router";
import { useExpoRouterContext } from "expo-router/src/hooks";
import { userStore } from "mobile/features/user";
import { useInitializeUser } from "mobile/features/user/initialize";
import { useCallback, useEffect, useRef, useState } from "react";
/**
 * Sets up any authentication logic (restoring user from previous session, redirection to login page, etc.)
 */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useInitializeUser();
  const user = userStore((state) => state.realmUser);
  const segments = useSegments();
  const router = useRouter();
  const navigation = useNavigation();

  const context = useExpoRouterContext();
  const [isNavigationReady, setReady] = useState(
    context.navigationRef.isReady(),
  );
  const timeoutRef = useRef<NodeJS.Timeout>();

  const readyCheckCount = useRef(0);

  const checkIfNavigationIsReady = useCallback(() => {
    const ready = context.navigationRef.isReady();
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

  useEffect(() => {
    if (!isNavigationReady) return;
    const inAuthGroup = segments[0] === "auth";
    const inAppGroup = segments[0] === "app";
    // Don't redirect if the router is not yet initialized.
    if (inAuthGroup === undefined) return;

    if (!user && !inAuthGroup) {
      console.log("Should redirect to login page");
      router.replace("/auth/signin");
    } else if (user && !inAppGroup) {
      // Redirect away from the sign-in page.
      console.log("Should enter app");
      router.replace("/app");
    }
  }, [isNavigationReady, user, segments, navigation]);

  return (
    <>
      {!isNavigationReady && <SplashScreen />}
      {children}
    </>
  );
};
