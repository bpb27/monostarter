import { Heading } from "@repo/design";
import { type FC } from "react";
import { type RouteObject, RouterProvider, createBrowserRouter } from "react-router";
import { AppLayout } from "~/components/layouts/app-layout";
import { AboutPage } from "~/pages/aboout/about.page";
import { LoginPage } from "~/pages/login/login.page";
import { welcomePageLoader } from "~/pages/welcome/welcome.data";
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
          {
            path: ROUTES.WELCOME,
            element: <WelcomePage />,
            loader: welcomePageLoader,
            children: [
              { path: ROUTES.WELCOME_A, element: <Heading>Welcome message A</Heading> },
              { path: ROUTES.WELCOME_B, element: <Heading>Welcome message B</Heading> },
            ],
          },
          { path: ROUTES.ABOUT, element: <AboutPage /> },
        ],
      },
    ],
  },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
] satisfies RouteObject[];

const router = createBrowserRouter(routes);
export const RoutesProvider: FC = () => <RouterProvider router={router} />;
