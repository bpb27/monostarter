import { useAtom } from "jotai";
import { useCallback } from "react";
import { api } from "~/core/api";
import { atomUser } from "~/core/state";
import { PAGE_STATUS } from "~/utils/enums";

export const useWelcomePageData = () => {
  const [user, setUser] = useAtom(atomUser);
  const userData = api.users.getById.useQuery({ id: user?.id ?? "" });
  const logout = useCallback(() => setUser(undefined), [setUser]);

  if (userData.data) {
    return { status: PAGE_STATUS.LOADED, user: userData.data, logout };
  } else if (userData.isPending) {
    return { status: PAGE_STATUS.LOADING };
  } else {
    return { status: PAGE_STATUS.ERROR, error: userData.error?.message };
  }
};
