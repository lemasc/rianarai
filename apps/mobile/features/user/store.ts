import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type UserStore = {
  isInitialized: boolean;
  firebaseUser?: FirebaseAuthTypes.User | null;
  realmUser?: Realm.User | null;
  isSyncing: boolean;
};

export const userStore = create(
  subscribeWithSelector<UserStore>(() => ({
    isInitialized: false,
    isSyncing: false,
  }))
);
