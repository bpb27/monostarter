import { useAtomValue } from "jotai";
import { api } from "~/core/api";
import { atomUser } from "~/core/state";
import { PAGE_STATUS } from "~/utils/enums";

export const useWelcomePageData = () => {
  const user = useAtomValue(atomUser);
  const userData = api.users.getById.useQuery({ id: user?.id ?? "" });

  if (userData.data) {
    return { status: PAGE_STATUS.LOADED, user: userData.data };
  } else if (userData.isPending) {
    return { status: PAGE_STATUS.LOADING };
  } else {
    return { status: PAGE_STATUS.ERROR, error: userData.error?.message };
  }
};

export type WelcomePageData = Extract<ReturnType<typeof useWelcomePageData>, { status: "loaded" }>;
