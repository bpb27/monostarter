import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ROUTES } from "./routes";

export const atomTheme = atomWithStorage<"light" | "dark" | "inherit">("theme", "inherit", undefined, {
  getOnInit: true,
});

export const atomUser = atomWithStorage<{ id: string } | undefined>("user", undefined, undefined, {
  getOnInit: true,
});

export const atomPathAfterLogin = atom<string>(ROUTES.HOME);
