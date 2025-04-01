import { Box, type BoxProps } from "@chakra-ui/react/box";
import { Flex, type FlexProps } from "@chakra-ui/react/flex";
import { Link, type LinkProps } from "@chakra-ui/react/link";
import { Stack, type StackProps } from "@chakra-ui/react/stack";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

// NavbarContainer Component
export interface NavbarContainerProps extends FlexProps {
  children: ReactNode;
}

export const NavbarContainer = ({ children, ...props }: NavbarContainerProps) => {
  return (
    <Flex
      position="sticky"
      as="nav"
      top={0}
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={4}
      bg="white"
      color="gray.600"
      shadow="sm"
      zIndex="banner"
      _dark={{
        bg: "gray.800",
        color: "white",
      }}
      {...props}
    >
      {children}
    </Flex>
  );
};

// NavbarBrand Component
export interface NavbarBrandProps extends BoxProps {
  children: ReactNode;
}

export const NavbarBrand = ({ children, ...props }: NavbarBrandProps) => {
  return (
    <Box {...props} mr="4">
      {children}
    </Box>
  );
};

// NavbarToggle Component
export interface NavbarToggleProps extends BoxProps {
  isOpen: boolean;
  toggle: () => void;
}

export const NavbarToggle = ({ toggle, isOpen, ...props }: NavbarToggleProps) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle} cursor="pointer" {...props}>
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </Box>
  );
};

// NavbarContent Component
export interface NavbarContentProps extends BoxProps {
  children: ReactNode;
  isOpen?: boolean;
}

export const NavbarContent = ({ children, isOpen = true, ...props }: NavbarContentProps) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "flex" }}
      width={{ base: "full", md: "auto" }}
      alignItems="center"
      flexGrow={1}
      {...props}
    >
      {children}
    </Box>
  );
};

// NavbarItem Component
export interface NavbarItemProps extends Omit<LinkProps, "children"> {
  children: ReactNode;
  isActive?: boolean;
}

export const NavbarItem = ({ children, isActive = false, ...props }: NavbarItemProps) => {
  return (
    <Link
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: "gray.100",
        _dark: { bg: "gray.700" },
      }}
      bg={isActive ? "gray.100" : "transparent"}
      _dark={{ bg: isActive ? "gray.700" : "transparent" }}
      fontWeight={isActive ? "semibold" : "normal"}
      asChild
      {...props}
    >
      {children}
    </Link>
  );
};

// NavbarMenu Component
export interface NavbarMenuProps extends Omit<StackProps, "direction"> {
  children: ReactNode;
}

export const NavbarMenu = ({ children, ...props }: NavbarMenuProps) => {
  return (
    <Stack
      as="div"
      flexDirection={{ base: "column", md: "row" }}
      display={{ base: "block", md: "flex" }}
      width={{ base: "full", md: "auto" }}
      alignItems="center"
      gap={4}
      mt={{ base: 4, md: 0 }}
      {...props}
    >
      {children}
    </Stack>
  );
};

// Main Navbar Component
export interface NavbarProps extends Omit<BoxProps, "direction"> {
  children?: ReactNode;
  logo?: ReactNode;
}

export const Navbar = ({ children, logo, ...props }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavbarContainer {...props}>
      <NavbarBrand>{logo}</NavbarBrand>
      <NavbarToggle toggle={toggle} isOpen={isOpen} />
      <NavbarContent isOpen={isOpen}>
        <NavbarMenu>{children}</NavbarMenu>
      </NavbarContent>
    </NavbarContainer>
  );
};
