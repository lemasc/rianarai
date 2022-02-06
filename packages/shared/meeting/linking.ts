import { GetLinking } from "./types";

const getLinking: GetLinking = () => {
  const isMobile = () => false;
  const getCodeFromUrl = (url: string) => {
    const urlConst = new URL(url);
    if (!urlConst.hostname.includes("zoom.us")) return null;
    const params = new URLSearchParams(urlConst.search);
    if (!params.has("pwd")) return null;
    return params.get("pwd");
  };
  const openLink = (url) => {
    window.location.replace(url);
  };
  return {
    isMobile,
    getCodeFromUrl,
    openLink,
  };
};

export default getLinking;
