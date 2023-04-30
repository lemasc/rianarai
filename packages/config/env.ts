import { z } from "zod";
const EnvSchema = z.object({
  androidClientId: z.string(),
  iosClientId: z.string(),
  webClientId: z.string(),
  realmAppId: z.string(),
});

export type ConfigEnv = z.infer<typeof EnvSchema>;

export const parseEnv = EnvSchema.parse;

export const parseProcessEnv = (): ConfigEnv => {
  try {
    return EnvSchema.parse({
      androidClientId: process.env.ANDROID_CLIENT_ID,
      iosClientId: process.env.IOS_CLIENT_ID,
      webClientId: process.env.WEB_CLIENT_ID,
      realmAppId: process.env.REALM_APP_ID,
    });
  } catch (error) {
    throw new Error(
      `Invalid environment variables. Please recheck .env file. \n${error}`
    );
  }
};

// Declare the global Node.js process env for TypeScript intellicense
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANDROID_CLIENT_ID: string;
      IOS_CLIENT_ID: string;
      WEB_CLIENT_ID: string;
      REALM_APP_ID: string;
    }
  }
}
