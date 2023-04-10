import { FontConfig, FontMetadata } from "config/fonts/types";
import fs from "fs/promises";
import path from "path";
import { resolveConfig, format } from "prettier";

const prettier = async (content: string) => {
  const options = await resolveConfig(process.cwd());
  return format(content, { ...options, parser: "babel" });
};

const overrideWeight = (family: string, originalWeight: number): number => {
  let weight = originalWeight;
  if (family === "Kanit") {
    weight = weight + 100;
  }
  if (weight === 600) {
    // Map semi-bold to bold
    return 700;
  }
  return weight;
};

async function processDir(prefix: string): Promise<string[]> {
  const dir = await fs.readdir(path.resolve(prefix), {
    withFileTypes: true,
  });
  let names: string[] = [];
  for (const d of dir) {
    const name = prefix + d.name;
    if (d.isFile() && d.name.endsWith(".ttf")) {
      names = [name, ...names];
    }
    if (d.isDirectory()) {
      names = [...names, ...(await processDir(prefix + d.name + "/"))];
    }
  }
  return names;
}

const capitalize = (val: string) =>
  val.slice(0, 1).toUpperCase() + val.slice(1);

const getFontMetadataFromName = (fileName: string): FontMetadata | null => {
  const segments = path.parse(fileName).name.split("-");
  if (segments.length !== 4) return null;
  const weight = segments[3];
  const name = segments[0];
  if (!weight || !name)
    throw new Error("Cannot parse name or weight from " + fileName);
  const weightNo = parseInt(weight.slice(0, 3), 10);
  const family = capitalize(name);
  return {
    family,
    type: weight.includes("italic") ? "italic" : "normal",
    weight: overrideWeight(family, isNaN(weightNo) ? 400 : weightNo),
    location: path.resolve(fileName),
  };
};

const banner = `/*
 * Expo Static Fonts list file.
 * This file shouldn't be edited manually. Use the CLI "yarn fonts" instead.
 */

import { FontConfig, FontImport } from './types'`;

/**
 * Node script for generating font files for imported to Expo.
 */
async function main() {
  const prefix = path.join(require.resolve("assets/package.json"), "../fonts");
  const outDir = path.join(process.cwd(), "fonts");
  const outFile = "/index.ts";
  try {
    // List all fonts in the directory
    const files = (await processDir(prefix + "/")).sort();
    // Get fonts metadata as array
    const fontsMetadata = files
      .map(getFontMetadataFromName)
      .filter((c) => c !== null) as FontMetadata[];
    console.log(`Loaded ${fontsMetadata.length} fonts.`);
    const fontsName = new Set<string>();
    let fontsConfig: FontConfig = {};
    const fontsImport: Record<string, string> = {};
    fontsMetadata.map((c) => {
      fontsName.add("'" + c.family + "'");
      const name = [
        capitalize(c.family),
        c.weight + (c.type === "italic" ? "Italic" : ""),
      ].join("-");
      fontsImport["'" + name + "'"] = `require('${path
        .join("assets/fonts", path.relative(prefix, c.location))
        .replaceAll("\\", "/")}')`;

      fontsConfig = {
        ...fontsConfig,
        [c.family]: {
          ...(fontsConfig[c.family] ?? {}),
          [c.weight]: {
            ...((fontsConfig[c.family] ?? {})[c.weight] ?? {}),
            [c.type]: name,
          },
        },
      };
    });
    const data = [
      banner,
      "export type ImportedFont = " +
        Array.from(fontsName.values()).join(" | "),
      "export const config: FontConfig<ImportedFont> = " +
        JSON.stringify(fontsConfig),
      "export const imports: FontImport = " +
        JSON.stringify(fontsImport).replaceAll('"', ""),
    ].join("\n\n");
    await fs.writeFile(outDir + outFile, await prettier(data));
    console.log(
      "Fonts file successfully generated at " +
        path.relative(process.cwd(), outDir + outFile)
    );
  } catch (err) {
    console.error(err);
  }
}

main();
