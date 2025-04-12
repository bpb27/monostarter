import { Link as DesignLink } from "@repo/design";
import { Link as ReactRouterLink, type LinkProps as ReactRouterLinkProps, useLocation } from "react-router";
import { type ClientRoute } from "~/core/routes";
import { type PathParams, applyPathParams } from "~/utils/routing";

// TODO: isActive is really just a navbar concern - move logic to hook to prevent rerenders

type LinkProps<T extends ClientRoute> = Omit<ReactRouterLinkProps, "to"> & {
  isActive?: boolean;
  to: T;
  params?: PathParams<T>;
};

export const Link = <T extends ClientRoute>({ isActive, params, to, ...rest }: LinkProps<T>) => {
  const { pathname } = useLocation();
  const underlined = typeof isActive === "boolean" ? isActive : pathname === to;
  return (
    <DesignLink asChild variant={underlined ? "underline" : "plain"}>
      <ReactRouterLink {...rest} to={applyPathParams(to, params)} />
    </DesignLink>
  );
};
