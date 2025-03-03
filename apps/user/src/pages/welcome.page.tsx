import { Box } from "@repo/ui/box";
import { Button } from "@repo/ui/button";
import { useAtom } from "jotai";
import { Link } from "../components/link";
import { ThemeButton } from "../components/theme-button";
import { api } from "../core/api";
import { ROUTES } from "../core/routes";
import { atomUser } from "../core/state";

export const WelcomePage = () => {
  const [user, setUser] = useAtom(atomUser);
  const { data } = api.users.getById.useQuery({ id: user?.id ?? "" });
  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <h1>Welcome {data?.firstName}</h1>
      <ThemeButton />
      <Link to={ROUTES.ABOUT}>About</Link>
      <Button onClick={() => setUser(undefined)}>Log out</Button>
    </Box>
  );
};
