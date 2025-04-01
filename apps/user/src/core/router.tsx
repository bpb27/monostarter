import { type FC } from "react";
import { type RouteObject, RouterProvider, createBrowserRouter } from "react-router";
import { AppLayout } from "~/components/layouts/app-layout";
import { AboutPage } from "~/pages/aboout/about.page";
import { LoginPage } from "~/pages/login/login.page";
import { WelcomePage } from "~/pages/welcome/welcome.page";
import { ProtectedRoute } from "./protected-route";
import { ROUTES } from "./routes";

const routes = [
  {
    path: ROUTES.ROOT,
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: ROUTES.WELCOME, element: <WelcomePage /> },
          { path: ROUTES.ABOUT, element: <AboutPage /> },
        ],
      },
    ],
  },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
] satisfies RouteObject[];

const router = createBrowserRouter(routes);
export const RoutesProvider: FC = () => <RouterProvider router={router} />;
