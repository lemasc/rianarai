export type GetLinking = () => {
  isMobile: () => boolean;
  openLink: (url: string) => void;
  getCodeFromUrl: (url: string) => string | undefined;
};
