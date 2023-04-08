import { useEffect } from "react";

import { auth } from "../../firebase";
import { userStore } from "../store";

/**
 * This file is responsible for initializing the firebase user
 */
export const useInitFirebaseUser = () => {
  useEffect(
    () =>
      auth().onAuthStateChanged((firebaseUser) => {
        console.log("Firebase User", firebaseUser);
        userStore.setState({ firebaseUser, isInitialized: true });
      }),
    []
  );
};
