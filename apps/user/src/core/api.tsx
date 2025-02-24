import type { AppRouter } from "@repo/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type FC, type PropsWithChildren, useState } from "react";

export const api = createTRPCReact<AppRouter>();

export const ApiProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		api.createClient({
			links: [loggerLink(), httpBatchLink({ url: "http://localhost:3000/trpc" })],
		}),
	);

	return (
		<api.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</api.Provider>
	);
};
