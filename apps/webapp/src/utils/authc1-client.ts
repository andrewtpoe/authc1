import type { Cookie } from "@builder.io/qwik-city";
import type { Storage } from "@authc1/auth-js";
import { Authc1Client } from "../../../../packages/auth-js/src/index";

const createCookieStorageManager = (cookie: Cookie): Storage => {
  return {
    setItem(key: string, value: string): void {
      console.log("createCookieStorageManager", key, value);
      const options = {
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      };
      cookie.set(key, value, options);
    },

    getItem(key: string): string | null {
      return cookie.get(key)?.value as string;
    },

    removeItem(key: string): void {
      cookie.delete(key);
    },
    length: 0,
    key() {
      return null;
    },
    clear() {},
  };
};

export function createAuthc1Client(
  cookie: Cookie,
  appId: string
): Authc1Client {
  const customStorageManager = createCookieStorageManager(cookie);

  return new Authc1Client(appId, {
    storage: customStorageManager,
    baseUrl: "http://127.0.0.1:8787/v1",
  });
}