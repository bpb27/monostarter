import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "./core/api.tsx";
import { RoutesProvider } from "./core/routes.tsx";
import { ThemeProvider } from "./core/theme.tsx";
import "@radix-ui/themes/styles.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element missing");

const App = () => (
	<ApiProvider>
		<ThemeProvider>
			<RoutesProvider />
		</ThemeProvider>
	</ApiProvider>
);

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
