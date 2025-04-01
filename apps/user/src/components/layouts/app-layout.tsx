import { Box, Heading, Navbar, NavbarItem } from "@repo/design";
import { Link, Outlet, useLocation } from "react-router";
import { ROUTES } from "~/core/routes";

export const AppLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar logo={<Heading size="2xl">My App</Heading>}>
        <NavbarItem isActive={pathname === ROUTES.WELCOME}>
          <Link to={ROUTES.WELCOME}>Home</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === ROUTES.ABOUT}>
          <Link to={ROUTES.ABOUT}>About</Link>
        </NavbarItem>
      </Navbar>
      <Box my="8" mx="4">
        <Outlet />
      </Box>
    </>
  );
};
