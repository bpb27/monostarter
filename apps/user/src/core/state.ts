import { atomWithStorage } from "jotai/utils";

export const atomTheme = atomWithStorage<"light" | "dark" | "inherit">("theme", "inherit", undefined, {
	getOnInit: true,
});

export const atomUser = atomWithStorage<{ email: string } | undefined>("user", undefined, undefined, {
	getOnInit: true,
});
