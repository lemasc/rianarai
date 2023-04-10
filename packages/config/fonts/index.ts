/*
 * Expo Static Fonts list file.
 * This file shouldn't be edited manually. Use the CLI "yarn fonts" instead.
 */

import { FontConfig, FontImport } from "./types";

export type ImportedFont =
  | "Kanit"
  | "Kodchasan"
  | "Pattaya"
  | "Roboto"
  | "Sarabun";

export const config: FontConfig<ImportedFont> = {
  Kanit: {
    400: { normal: "Kanit-400", italic: "Kanit-400Italic" },
    500: { normal: "Kanit-500" },
    700: { normal: "Kanit-700" },
  },
  Kodchasan: {
    400: { normal: "Kodchasan-400" },
    700: { normal: "Kodchasan-700" },
  },
  Pattaya: { 400: { normal: "Pattaya-400" } },
  Roboto: { 400: { normal: "Roboto-400" }, 500: { normal: "Roboto-500" } },
  Sarabun: {
    400: { italic: "Sarabun-400Italic", normal: "Sarabun-400" },
    700: { normal: "Sarabun-700", italic: "Sarabun-700Italic" },
  },
};

export const imports: FontImport = {
  "Kanit-400": require("assets/fonts/kanit/kanit-v7-thai_latin-300.ttf"),
  "Kanit-400Italic": require("assets/fonts/kanit/kanit-v7-thai_latin-300italic.ttf"),
  "Kanit-700": require("assets/fonts/kanit/kanit-v7-thai_latin-500.ttf"),
  "Kanit-500": require("assets/fonts/kanit/kanit-v7-thai_latin-regular.ttf"),
  "Kodchasan-700": require("assets/fonts/kodchasan/kodchasan-v6-thai_latin-600.ttf"),
  "Kodchasan-400": require("assets/fonts/kodchasan/kodchasan-v6-thai_latin-regular.ttf"),
  "Pattaya-400": require("assets/fonts/pattaya/pattaya-v7-thai_latin-regular.ttf"),
  "Roboto-500": require("assets/fonts/roboto/roboto-v29-latin-500.ttf"),
  "Roboto-400": require("assets/fonts/roboto/roboto-v29-latin-regular.ttf"),
  "Sarabun-700": require("assets/fonts/sarabun/sarabun-v8-thai_latin-600.ttf"),
  "Sarabun-700Italic": require("assets/fonts/sarabun/sarabun-v8-thai_latin-600italic.ttf"),
  "Sarabun-400Italic": require("assets/fonts/sarabun/sarabun-v8-thai_latin-italic.ttf"),
  "Sarabun-400": require("assets/fonts/sarabun/sarabun-v8-thai_latin-regular.ttf"),
};
