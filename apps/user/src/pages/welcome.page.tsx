import { Button, ColorModeButton } from "@repo/design";
import { Box } from "@repo/design";
import { useAtom } from "jotai";
import { Link } from "../components/link";
import { api } from "../core/api";
import { ROUTES } from "../core/routes";
import { atomUser } from "../core/state";

export const WelcomePage = () => {
  const [user, setUser] = useAtom(atomUser);
  const { data } = api.users.getById.useQuery({ id: user?.id ?? "" });
  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <h1>Welcome {data?.firstName}</h1>
      <ColorModeButton />
      <Link to={ROUTES.ABOUT}>About</Link>
      <Button onClick={() => setUser(undefined)}>Log out</Button>
    </Box>
  );
};
