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

type BoxProps = PropsWithChildren<{
	display?: CSSProperties["display"];
	flexDirection?: CSSProperties["flexDirection"];
	justifyContent?: CSSProperties["justifyContent"];
	alignItems?: CSSProperties["alignItems"];
	gap?: PxScale;
	p?: PxScale;
	m?: PxScale;
}>;

const toReactStyle = (props: BoxProps): CSSProperties => {
	return {
		gap: props.gap,
		padding: props.p,
		margin: props.m,
		display: props.display,
		flexDirection: props.flexDirection,
		justifyContent: props.justifyContent,
		alignItems: props.alignItems,
	};
};

export const Box: FC<PropsWithChildren<BoxProps>> = ({ children, ...props }) => {
	return <div style={toReactStyle(props)}>{children}</div>;
};
