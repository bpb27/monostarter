import { Provider } from "@repo/design";
import type { FC, PropsWithChildren } from "react";

export const ThemeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Provider>{children}</Provider>;
};
