import { Box, Button, ColorModeButton, Heading, Navbar } from "@repo/design";
import { useSetAtom } from "jotai";
import { Outlet } from "react-router";
import { ROUTES } from "~/core/routes";
import { atomUser } from "~/core/state";
import { Link } from "../link";

export const AppLayout = () => {
  const setUser = useSetAtom(atomUser);
  return (
    <>
      <Navbar.Root>
        <Navbar.Left>
          <Heading size="2xl" fontWeight="bolder">
            BRAND
          </Heading>
          <Box display={{ base: "none", md: "flex" }} gap="4">
            <Link to={ROUTES.WELCOME}>Home</Link>
            <Link to={ROUTES.ABOUT}>About</Link>
          </Box>
        </Navbar.Left>
        <Navbar.Right>
          <ColorModeButton />
          <Navbar.Dropdown>
            <Navbar.DropdownItem actionDescription="Home">
              <Link to={ROUTES.WELCOME}>Home</Link>
            </Navbar.DropdownItem>
            <Navbar.DropdownItem actionDescription="About">
              <Link to={ROUTES.ABOUT}>About</Link>
            </Navbar.DropdownItem>
            <Navbar.DropdownSeparator />
            <Navbar.DropdownItem actionDescription="Log out">
              <Button textAlign="left" variant="plain" onClick={() => setUser(undefined)}>
                Log out
              </Button>
            </Navbar.DropdownItem>
          </Navbar.Dropdown>
        </Navbar.Right>
      </Navbar.Root>
      <Box my="8" mx="4">
        <Outlet />
      </Box>
    </>
  );
};
