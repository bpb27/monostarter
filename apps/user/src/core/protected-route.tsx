import { getDefaultStore, useAtomValue, useSetAtom } from "jotai";
import { type FC, useEffect } from "react";
import { LoaderFunction, LoaderFunctionArgs, Outlet, redirect, useLocation, useNavigate } from "react-router";
import { ROUTES } from "./routes";
import { atomMaybeUser, atomPathAfterLogin } from "./state";

export const ProtectedRoute: FC = () => {
  const user = useAtomValue(atomMaybeUser);
  const setRedirect = useSetAtom(atomPathAfterLogin);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setRedirect(pathname);
      navigate(ROUTES.LOGIN);
    } else if (pathname === ROUTES.ROOT) {
      navigate(ROUTES.WELCOME);
    }
  }, [user, setRedirect, pathname, navigate]);

  return !user ? null : <Outlet />;
};

/*
  React router will execute all loaders in the route tree before rendering components,
  which means the <Protected/> component won't prevent child loaders from firing.
  We don't want unnecessary API calls that are destined to be 401s.
  So all loaders for routes in the protected route tree should be wrapped with this function.
*/

/** Wrap all react router loaders with this function unless outside the authed route tree */
export function protectedLoader<T extends LoaderFunction<unknown>>(load: T): Awaited<T> {
  const loader = async (args: LoaderFunctionArgs) => {
    const user = getDefaultStore().get(atomMaybeUser);
    if (user) {
      return await load(args);
    } else {
      throw redirect(ROUTES.LOGIN);
    }
  };
  return loader as Awaited<T>;
}
