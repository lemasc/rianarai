import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type UserStore = {
  isInitialized: boolean;
  firebaseUser?: FirebaseAuthTypes.User | null;
  realmUser?: Realm.User | null;
};

export const userStore = create(
  subscribeWithSelector<UserStore>(() => ({
    isInitialized: false,
  }))
);
