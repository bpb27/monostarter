import { Box } from "@repo/ui/box";
import { useSetAtom } from "jotai";
import { Link } from "react-router";
import { ThemeButton } from "../components/theme-button";
import { api } from "../core/api";
import { atomUser } from "../core/state";

export const WelcomePage = () => {
	const setUser = useSetAtom(atomUser);
	const { data } = api.hello.useQuery({ name: "Gary" });
	return (
		<Box display="flex" flexDirection="column" gap="8px">
			<h1>Welcome {data?.greeting}</h1>
			<ThemeButton />
			<Link to="/about">About</Link>
			<button onClick={() => setUser(undefined)} type="button">
				Log out
			</button>
		</Box>
	);
};
