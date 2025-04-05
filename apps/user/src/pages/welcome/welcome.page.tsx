import { Heading } from "@repo/design";
import { Box } from "@repo/design";
import { WelcomePageData, useWelcomePageData } from "./welcome.data";

export const WelcomePageUI = ({ user }: WelcomePageData) => {
  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <Heading size="2xl">Welcome {user.firstName}</Heading>
    </Box>
  );
};

export const WelcomePage = () => {
  const props = useWelcomePageData();
  if (props.status === "loaded") return <WelcomePageUI {...props} />;
  if (props.status === "loading") return <div>...Loading</div>;
  return <div>{props.error || "Oops something went wrong."}</div>;
};
