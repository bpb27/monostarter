/** creates an object of path params in found a route string, e.g. /user/:id returns { id: string } */
export type PathParams<Path extends string> = Path extends `${string}:${infer Param}/${infer Rest}`
	? { [K in Param | keyof PathParams<`/${Rest}`>]: string }
	: Path extends `${string}:${infer Param}`
		? { [K in Param]: string }
		: null;

/** interpolates params into a path string */
export const applyPathParams = (path: string, params: Record<string, string | number> | null | undefined) => {
	if (!params) return path;
	return Object.keys(params).reduce((resolvedPath, key) => resolvedPath.replace(`:${key}`, String(params[key])), path);
};
