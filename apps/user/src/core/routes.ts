import { type PathParams, applyPathParams } from "~/utils/routing";

export const ROUTES = {
  ROOT: "/" as const,
  WELCOME: "/welcome" as const,
  ABOUT: "/about" as const,
  LOGIN: "/login" as const,
} as const;

export function linkTo<Path extends ClientRoute>(path: Path): string;
export function linkTo<Path extends ClientRoute>(path: Path, params: PathParams<Path>): string;
export function linkTo<Path extends ClientRoute>(path: Path, params?: PathParams<Path>): string {
  return applyPathParams(path, params);
}

export type ClientRoute = (typeof ROUTES)[keyof typeof ROUTES];
