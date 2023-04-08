import { useNavigation } from "@react-navigation/core";
import { useRouter, useSegments } from "expo-router";
import { getNavigationContainerRef } from "expo-router/src/NavigationContainer";
import { userStore } from "mobile/features/user";
import { useInitializeUser } from "mobile/features/user/initialize";
import { useEffect, useRef, useState } from "react";

/**
 * Sets up any authentication logic (restoring user from previous session, redirection to login page, etc.)
 */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useInitializeUser();
  const user = userStore((state) => state.realmUser);
  const segments = useSegments();
  const router = useRouter();
  const navigation = useNavigation();

  const [isNavigationReady, setReady] = useState(
    getNavigationContainerRef().isReady()
  );
  const timeoutRef = useRef<NodeJS.Timeout>();

  const checkIfNavigationIsReady = () => {
    const ready = getNavigationContainerRef().isReady();
    console.log("READY", ready);
    if (ready) {
      setReady(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        checkIfNavigationIsReady();
      }, 10);
    }
  };
  useEffect(() => {
    if (!isNavigationReady) {
      checkIfNavigationIsReady();
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

  return <>{children}</>;
};