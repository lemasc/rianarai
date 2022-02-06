import { SWRConfigValue } from "./types";
import { AppState, AppStateStatus } from "react-native";
import Network, { NetInfoState } from "@react-native-community/netinfo";

/**
 * SWR Options for React Native (Non-browser environment).
 */
const options: SWRConfigValue = {
  provider: () => new Map(),
  isVisible: () => true,
  initFocus(cb) {
    let appState = AppState.currentState;
    const onAppStateChange = (nextAppState: AppStateStatus) => {
      /* If it's resuming from background or inactive mode to active one */
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        cb();
      }
      appState = nextAppState;
    };

    // Subscribe to the app state change events
    AppState.addEventListener("change", onAppStateChange);
    return () => {
      AppState.removeEventListener("change", onAppStateChange);
    };
  },
  initReconnect(cb) {
    let previousState: NetInfoState;
    const onNetworkChange = (state: NetInfoState) => {
      if (
        previousState?.isInternetReachable === false &&
        state.isConnected &&
        state.isInternetReachable
      ) {
        cb();
      }
      previousState = state;
    };
    const subscription = Network.addEventListener(onNetworkChange);
    return () => subscription();
  },
};

export default options;
