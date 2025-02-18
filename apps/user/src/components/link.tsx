import { Link as ReactRouterLink, type LinkProps as ReactRouterLinkProps } from "react-router";
import type { ClientRoute } from "../core/routes";
import { type PathParams, applyPathParams } from "../utils/routing";

type LinkProps<T extends ClientRoute> = Omit<ReactRouterLinkProps, "to"> & {
	to: T;
	params?: PathParams<T>;
};

export const Link = <T extends ClientRoute>({ to, params, ...rest }: LinkProps<T>) => {
	return <ReactRouterLink {...rest} to={applyPathParams(to, params)} />;
};
