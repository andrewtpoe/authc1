import type { Cookie } from "@builder.io/qwik-city";
import jsonwebtoken from "@tsndr/cloudflare-worker-jwt";
import type { AuthState, ErrorResponse } from "./fetch";
import { getAccessTokenFromCookie } from "./fetch";
import { callApi } from "./fetch";
import type { JwtUser } from "~/types";
export const AUTHTOKEN_NAME: string = "fugit.app:user";

import type { Session } from "@authc1/auth-js";
import { createAuthc1Client } from "./authc1-client";
import type {
  ConfirmResetPasswordOptions,
  ForgetPasswordOptions,
  LoginRequest,
  RegisterRequest,
} from "@authc1/auth-js/src/types";

export const isUserAuthenticated = async (cookie: Cookie) => {
  return cookie.has(AUTHTOKEN_NAME);
};

export function decodeAccessToken(token: string): JwtUser {
  const { payload } = jsonwebtoken.decode(token);
  return payload as JwtUser;
}

interface EmailConfirm {
  code: string;
}

export const signIn = async (
  { email, password }: LoginRequest,
  cookie: Cookie,
  appId: string,
  baseUrl: string
): Promise<Session | ErrorResponse> => {
  try {
    const client = createAuthc1Client(cookie, appId, baseUrl);
    const data = await client.signInWithEmail({ email, password });
    return data;
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

export const register = async (
  { name, email, password }: RegisterRequest,
  cookie: Cookie,
  appId: string,
  baseUrl: string
): Promise<Session | ErrorResponse> => {
  try {
    const client = createAuthc1Client(cookie, appId, baseUrl);
    const data = await client.registerWithEmail({ name, email, password });
    return data;
  } catch (e: any) {
    return e;
  }
};

export const verify = async (
  cookie: Cookie,
  appId: string,
  baseUrl: string
): Promise<void | ErrorResponse> => {
  try {
    const client = createAuthc1Client(cookie, appId, baseUrl);
    const data = await client.sendEmailVerification();
    return data;
  } catch (e: any) {
    return e;
  }
};

export const confirm = async (
  { code }: EmailConfirm,
  cookie: Cookie,
  appId: string,
  baseUrl: string
): Promise<void | ErrorResponse> => {
  try {
    const client = createAuthc1Client(cookie, appId, baseUrl);
    const data = await client.confirmEmailWithOtp(code);
    await client.refreshAccessToken();
    return data;
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

export const forgotPassword = async (
  data: ForgetPasswordOptions,
  cookie: Cookie,
  appId: string,
  baseUrl: string
): Promise<void | ErrorResponse> => {
  try {
    const client = createAuthc1Client(cookie, appId, baseUrl);
    const res = await client.forgetEmailPassword(data);
    return res;
  } catch (e: any) {
    return e;
  }
};

export const confirmNewPassowrd = async (
  data: ConfirmResetPasswordOptions,
  cookie: Cookie,
  appId: string,
  baseUrl: string
): Promise<void | ErrorResponse> => {
  try {
    const client = createAuthc1Client(cookie, appId, baseUrl);
    const res = await client.confirmEmailNewPassword(data);
    return res;
  } catch (e: any) {
    return e;
  }
};

export const signOut = async (
  cookie: Cookie,
  appId: string,
  baseUrl: string
) => {
  const client = createAuthc1Client(cookie, appId, baseUrl);
  await client.logout();
  return null;
};

export interface JwtPayloadToUser {
  iss: string;
  aud: string | undefined;
  auth_time: number;
  id: string;
  exp: number;
  iat: number;
  email: string;
  sign_in_provider: string;
}

export async function refreshAndSaveAccessToken(
  cookie: Cookie,
  appId: string,
  baseUrl: string
): Promise<Session> {
  const client = createAuthc1Client(cookie, appId, baseUrl);
  const session = await client.refreshAccessToken();
  return session;
}
