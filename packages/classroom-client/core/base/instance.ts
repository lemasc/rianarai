import { AxiosResponse } from "axios";
import { ClassroomEvents } from "../../types/events";

type GrantType = "authorization_code" | "refresh_token";

export type RefreshRequestParams = {
  grant_type: GrantType;
  code?: string;
  refresh_token?: string;
  code_verifier?: string;
};

export type BaseUser = {
  serverAuthCode?: string | null;
  idToken: string | null;
  codeVerifier?: string;
};

export type BaseGoogleSignIn = {
  configPromise?: Promise<void>;
  signIn(options?: any): Promise<BaseUser>;
  hasPlayServices(options?: any): Promise<boolean>;
  configure(options?: any): void;
  addScopes(options: any): Promise<BaseUser | null>;
  signInSilently(): Promise<BaseUser>;
  signOut(): Promise<null>;
};

export interface BaseEventEmitter<L = ClassroomEvents> {
  addListener<U extends keyof L>(event: U, listener: L[U]): this;
  removeListener<U extends keyof L>(event: U, listener: L[U]): this;
}

export interface ClassroomClient {
  events: BaseEventEmitter;
  signIn: () => Promise<BaseUser>;
  addScopes: () => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  refresh: (idToken?: string) => Promise<void>;
  request: <T>(url: string) => Promise<AxiosResponse<T>>;
}
