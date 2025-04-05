import { Box, BoxProps, IconButton, Menu, Text } from "@chakra-ui/react";
import { MenuIcon } from "lucide-react";

/** The root container for the navbar */
export const Root = ({ children, ...props }: BoxProps) => (
  <Box
    position="sticky"
    top={0}
    zIndex="banner"
    w="full"
    as="nav"
    shadow="sm"
    p={{ base: 2, md: 3 }}
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    _dark={{ bg: "gray.800" }}
    {...props}
  >
    {children}
  </Box>
);

/** The left-aligned container for the navbar - can pass in any children */
export const Left = ({ children, ...props }: BoxProps) => (
  <Box display="flex" justifyContent="start" alignItems="center" gap="4" {...props}>
    {children}
  </Box>
);

/** The right-aligned container for the navbar - can pass in any children */
export const Right = ({ children, ...props }: BoxProps) => (
  <Box display="flex" justifyContent="end" alignItems="center" gap="4" {...props}>
    {children}
  </Box>
);

/** A dropdown menu for the navbar - children should be multiple Navbar.DropdownItem components */
export const Dropdown = ({ children, ...props }: Menu.RootProps) => (
  <Menu.Root {...props}>
    <Menu.Trigger asChild>
      <IconButton variant="ghost">
        <MenuIcon />
      </IconButton>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content _dark={{ bg: "gray.700" }}>{children}</Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
);

/** An individual dropdown item for the navbar dropdown menu - can pass in any children */
export const DropdownItem = ({
  actionDescription,
  children,
  ...props
}: Omit<Menu.ItemProps, "value"> & { actionDescription: string }) => (
  <Menu.Item value={actionDescription} asChild {...props}>
    {typeof children === "string" ? <Text>{children}</Text> : children}
  </Menu.Item>
);

/** A separator for the dropdown menu - should be used as a sibling of Navbar.DropdownItem components */
export const DropdownSeparator = (props: Menu.SeparatorProps) => <Menu.Separator {...props} />;
