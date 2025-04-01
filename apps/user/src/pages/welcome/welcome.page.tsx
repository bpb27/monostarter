import { Button, ColorModeButton, Heading } from "@repo/design";
import { Box } from "@repo/design";
import { Link } from "~/components/link";
import { ROUTES } from "~/core/routes";
import { useWelcomePageData } from "./welcome.data";

type WelcomePageUIProps = Extract<ReturnType<typeof useWelcomePageData>, { status: "loaded" }>;

export const WelcomePageUI = ({ logout, user }: WelcomePageUIProps) => {
  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <Heading size="2xl">Welcome {user.firstName}</Heading>
      <ColorModeButton />
      <Link to={ROUTES.ABOUT}>About</Link>
      <Button onClick={logout}>Log out</Button>
    </Box>
  );
};

export const WelcomePage = () => {
  const props = useWelcomePageData();
  if (props.status === "loading") return <div>...Loading</div>;
  if (props.status === "error") return <div>{props.error}</div>;
  return <WelcomePageUI {...props} />;
};
