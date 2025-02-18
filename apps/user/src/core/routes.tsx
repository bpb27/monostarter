import { useAtomValue } from "jotai";
import type { FC } from "react";
import { Outlet, type RouteObject, RouterProvider, createBrowserRouter } from "react-router";
import { AboutPage } from "../pages/about.page";
import { LoginPage } from "../pages/login.page";
import { WelcomePage } from "../pages/welcome.page";
import { type PathParams, applyPathParams } from "../utils/routing";
import { atomUser } from "./state";

const Protected: FC = () => {
	const user = useAtomValue(atomUser);
	return !user ? <LoginPage /> : <Outlet />;
};

export const ROUTES = {
	HOME: "/" as const,
	WELCOME: "/welcome" as const,
	ABOUT: "/about" as const,
	LOGIN: "/login" as const,
} as const;

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
