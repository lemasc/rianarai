import { AlertOptions } from "./types";

export async function alertAsync<T>(props: AlertOptions<T>): Promise<T> {
  throw new Error("Platform not resolved. Please check your configuration.");
}
