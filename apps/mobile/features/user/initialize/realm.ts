import { useApp } from "@realm/react";
import { useCallback, useEffect } from "react";

import { userStore } from "../store";

export const useInitRealmUser = () => {
  const app = useApp();
  const user = userStore((state) => state.realmUser);
  const setUser = useCallback((user: Realm.User | null) => {
    userStore.setState({ realmUser: user });
  }, []);

  // Set User on initial mount
  useEffect(() => {
    setUser(app.currentUser);
  }, []);

  useEffect(() => {
    const event = () => {
      if (app.currentUser?.id !== user) {
        setUser(app.currentUser);
      }
    };
    user?.addListener(event);
    app?.addListener(event);
    return () => {
      user?.removeListener(event);
      app?.removeListener(event);
    };
  }, [user, app]);

  useEffect(
    () =>
      userStore.subscribe(
        (state) => state.firebaseUser,
        async (firebaseUser) => {
          const user = app.currentUser;
          const realmFirebaseUserId = firebaseUser
            ? user?.identities.find(
                (identity) => identity.providerType === "custom-token"
              )?.id
            : undefined;
          if (
            firebaseUser &&
            firebaseUser.emailVerified &&
            firebaseUser.uid !== realmFirebaseUserId
          ) {
            const idToken = await firebaseUser.getIdToken();
            const credential = Realm.Credentials.jwt(idToken);
            try {
              await app.logIn(credential);
            } catch (err) {
              console.error(err);
            }
          } else if (firebaseUser === null && user) {
            try {
              await user.logOut();
            } catch (err) {
              console.error(err);
            }
          }
        }
      ),
    [app]
  );
};
