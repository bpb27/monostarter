import { getDefaultStore } from "jotai";
import { useLoaderData } from "react-router";
import { trpcClient } from "~/core/api";
import { protectedLoader } from "~/core/protected-route";
import { atomUser } from "~/core/state";

export const welcomePageLoader = protectedLoader(async () => {
  const { id } = getDefaultStore().get(atomUser);
  const user = await trpcClient.users.getById.query({ id });
  return { user };
});

export const useWelcomePageData = () => {
  const loaderData = useLoaderData<typeof welcomePageLoader>();
  return loaderData;
};

export type WelcomePageData = ReturnType<typeof useWelcomePageData>;
