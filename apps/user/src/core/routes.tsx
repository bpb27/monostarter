import { useAtomValue } from "jotai";
import type { FC } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";
import { AboutPage } from "../pages/about.page";
import { LoginPage } from "../pages/login.page";
import { WelcomePage } from "../pages/welcome.page";
import { atomUser } from "./state";

const Protected: FC = () => {
	const user = useAtomValue(atomUser);
	return !user ? <LoginPage /> : <Outlet />;
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Protected />,
		children: [
			{
				index: true,
				element: <WelcomePage />,
			},
			{
				path: "/welcome",
				element: <WelcomePage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
		],
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
]);

export const RoutesProvider: FC = () => <RouterProvider router={router} />;
