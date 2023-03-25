export type FontMetadata = {
  family: string;
  type: string;
  weight: number;
  location: string;
};

export type FontConfig<K extends string = string> = {
  [family in K]: {
    [weight: number]: {
      [type: string]: string;
    };
  };
};

export type FontImport = Record<string, string>;
