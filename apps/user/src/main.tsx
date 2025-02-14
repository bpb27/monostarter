import { Theme } from "@radix-ui/themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/login.page.tsx";
import { WelcomePage } from "./pages/welcome.page.tsx";
import { AuthProvider, Protected } from "./providers/auth.tsx";
import "@radix-ui/themes/styles.css";
import { useLocalStorage } from "./utls/use-local-storage.ts";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element missing");

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
		],
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
]);

const App = () => {
	const [theme] = useLocalStorage("theme"); // TODO: not dyanmic for some reason
	return (
		<Theme appearance={theme ?? "inherit"}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Theme>
	);
};

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
