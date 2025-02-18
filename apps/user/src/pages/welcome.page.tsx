import { Box } from "@repo/ui/box";
import { Button } from "@repo/ui/button";
import { useSetAtom } from "jotai";
import { Link } from "../components/link";
import { ThemeButton } from "../components/theme-button";
import { api } from "../core/api";
import { ROUTES } from "../core/routes";
import { atomUser } from "../core/state";

export const WelcomePage = () => {
	const setUser = useSetAtom(atomUser);
	const { data } = api.hello.useQuery({ name: "Gary" });
	return (
		<Box display="flex" flexDirection="column" gap="8px">
			<h1>Welcome {data?.greeting}</h1>
			<ThemeButton />
			<Link to={ROUTES.ABOUT}>About</Link>
			<Button onClick={() => setUser(undefined)}>Log out</Button>
		</Box>
	);
};
