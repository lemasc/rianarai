import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ENV } from "mobile/features/env";
import { useEffect } from "react";

/**
 * This file is used to initialize the Google Sign In
 */
export const useInitGoogleUser = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email", "profile", "openid"],
      webClientId: ENV.webClientId,
    });
    // TODO: Restore Google signed in user if necessary
  }, []);
};
