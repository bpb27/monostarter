import { useAtomValue, useSetAtom } from "jotai";
import { type FC, useEffect } from "react";
import { Outlet, type RouteObject, RouterProvider, createBrowserRouter, useLocation, useNavigate } from "react-router";
import { AboutPage } from "~/pages/about.page";
import { LoginPage } from "~/pages/login-page/login.page";
import { WelcomePage } from "~/pages/welcome.page";
import { type PathParams, applyPathParams } from "~/utils/routing";
import { ROUTES } from "./routes";
import { atomPathAfterLogin, atomUser } from "./state";

const Protected: FC = () => {
  const user = useAtomValue(atomUser);
  const setRedirect = useSetAtom(atomPathAfterLogin);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setRedirect(pathname);
      navigate(ROUTES.LOGIN);
    }
  }, [user, setRedirect, pathname, navigate]);

  return !user ? null : <Outlet />;
};

const routes = [
  {
    path: ROUTES.HOME,
    element: <Protected />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: ROUTES.WELCOME,
        element: <WelcomePage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
] satisfies RouteObject[];

const router = createBrowserRouter(routes);

export const RoutesProvider: FC = () => <RouterProvider router={router} />;

export type ClientRoute = (typeof ROUTES)[keyof typeof ROUTES];

export function linkTo<Path extends ClientRoute>(path: Path): string;
export function linkTo<Path extends ClientRoute>(path: Path, params: PathParams<Path>): string;
export function linkTo<Path extends ClientRoute>(path: Path, params?: PathParams<Path>): string {
  return applyPathParams(path, params);
}
