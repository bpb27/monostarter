import { Heading } from "@repo/design";
import { Box } from "@repo/design";
import { Outlet } from "react-router";
import { WelcomePageData, useWelcomePageData } from "./welcome.data";

export const WelcomePageUI = ({ user }: WelcomePageData) => {
  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <Heading size="2xl">Welcome {user.firstName}</Heading>
      <Outlet />
    </Box>
  );
};

export const WelcomePage = () => {
  const props = useWelcomePageData();
  return <WelcomePageUI {...props} />;
};
