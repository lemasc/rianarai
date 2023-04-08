import { useEffect } from "react";

import { useInitFirebaseUser } from "./firebase";
import { useInitGoogleUser } from "./google";
import { useInitRealmUser } from "./realm";
import { userStore } from "../store";

export const useInitializeUser = () => {
  useInitFirebaseUser();
  useInitGoogleUser();
  useInitRealmUser();
  useEffect(
    () =>
      userStore.subscribe((state) => {
        if (
          typeof state.firebaseUser !== "undefined" &&
          typeof state.realmUser !== "undefined" &&
          !state.isInitialized
        ) {
          userStore.setState({ isInitialized: true });
        }
      }),
    []
  );
};
