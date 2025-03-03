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

type ConstrainedStyleProps = PropsWithChildren<{
  alignItems?: CSSProperties["alignItems"];
  bottom?: PxScale;
  display?: CSSProperties["display"];
  flexDirection?: CSSProperties["flexDirection"];
  gap?: PxScale;
  height?: HeightScale;
  justifyContent?: CSSProperties["justifyContent"];
  left?: PxScale;
  margin?: PxScale;
  maxWidth?: CSSProperties["maxWidth"];
  padding?: PxScale;
  position?: CSSProperties["position"];
  right?: PxScale;
  top?: PxScale;
  width?: CSSProperties["width"];
}>;

type BoxVariant = "pageCenter" | "topRight" | "stack";

const variantStyles: Record<BoxVariant, ConstrainedStyleProps> = {
  pageCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100vh",
  },
  topRight: {
    position: "absolute",
    right: "16px",
    top: "16px",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
};

export const Box: FC<PropsWithChildren<ConstrainedStyleProps & { variant?: BoxVariant }>> = ({
  children,
  variant,
  ...props
}) => {
  const styles = variant ? { ...variantStyles[variant], ...props } : props;
  return <div style={styles}>{children}</div>;
};
