import { maybeOpenURL } from "react-native-app-link";
import { parse } from "expo-linking";

import { GetLinking } from "./types";
import { isObject, isString } from "../helpers";

const getLinking: GetLinking = () => {
  const isMobile = () => true;
  const getCodeFromUrl = (url: string) => {
    const urlConst = parse(url);
    if (
      urlConst.hostname?.includes("zoom.us") &&
      isObject(urlConst.queryParams) &&
      isString(urlConst.queryParams.pwd)
    ) {
      return urlConst.queryParams.pwd;
    }
    return;
  };
  const openLink = (url: string) => {
    maybeOpenURL(url, {
      playStoreId: "us.zoom.videomeetings",
      appName: "zoom-cloud-meetings",
      appStoreId: 546505307,
      appStoreLocale: "us",
    });
  };
  return {
    isMobile,
    getCodeFromUrl,
    openLink,
  };
};

export default getLinking;
