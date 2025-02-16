import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useAtomValue } from "jotai";
import { type FC, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";
import { AboutPage } from "./pages/about.page.tsx";
import { LoginPage } from "./pages/login.page.tsx";
import { WelcomePage } from "./pages/welcome.page.tsx";
import { atomTheme, atomUser } from "./state/index.ts";
import { trpc } from "./utils/trpc";
import "@radix-ui/themes/styles.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element missing");

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

const App = () => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000/trpc",
				}),
			],
		}),
	);
	const theme = useAtomValue(atomTheme);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Theme appearance={theme}>
					<RouterProvider router={router} />
				</Theme>
			</QueryClientProvider>
		</trpc.Provider>
	);
};

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
