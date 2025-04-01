import { useAtomValue, useSetAtom } from "jotai";
import { type FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ROUTES } from "./routes";
import { atomPathAfterLogin, atomUser } from "./state";

export const ProtectedRoute: FC = () => {
  const user = useAtomValue(atomUser);
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
