import type { CSSProperties, FC, PropsWithChildren } from "react";

type PxScale =
	| "0px"
	| "2px"
	| "4px"
	| "8px"
	| "16px"
	| "24px"
	| "32px"
	| "40px"
	| "48px"
	| "64px"
	| "80px"
	| "96px"
	| "128px";

type HeightScale = "100vh" | "100%";

type BoxProps = PropsWithChildren<{
	display?: CSSProperties["display"];
	flexDirection?: CSSProperties["flexDirection"];
	justifyContent?: CSSProperties["justifyContent"];
	alignItems?: CSSProperties["alignItems"];
	gap?: PxScale;
	padding?: PxScale;
	margin?: PxScale;
	height?: HeightScale;
}>;

export const Box: FC<PropsWithChildren<BoxProps>> = ({ children, ...props }) => {
	return <div style={props}>{children}</div>;
};
