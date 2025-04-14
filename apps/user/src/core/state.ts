import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ROUTES } from "./routes";

/*
  Accessing an atom in a react component:
  const user = useAtomValue(atomUser);

  Setting an atom in a react component:
  const setPath = useSetAtom(atomPathAfterLogin);
  setPath("/my-url");
  
  Accessing an atom outside of a react component:
  getDefaultStore().get(atomUser)

  Setting an atom outside of a react component:
  getDefaultStore().set(atomPathAfterLogin, "/my-url");
*/

/** this should only be used directly referenced in the context of login/logout */
export const atomMaybeUser = atomWithStorage<{ id: string } | undefined>("user", undefined, undefined, {
  getOnInit: true,
});

export const atomUser = atom(get => {
  const user = get(atomMaybeUser);
  if (!user) throw new Error("User not found");
  return user;
});

export const atomPathAfterLogin = atom<string>(ROUTES.ROOT);
