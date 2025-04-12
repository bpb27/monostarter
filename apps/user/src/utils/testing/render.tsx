export * from "vitest";
export * from "@testing-library/react";
export * from "@testing-library/user-event";

import { render as rtlRender } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";
import { type ReactElement, type ReactNode, StrictMode } from "react";
import { ThemeProvider } from "~/core/theme";

const Providers = ({ children }: { children: ReactNode }) => (
  <StrictMode>
    <ThemeProvider>{children}</ThemeProvider>
  </StrictMode>
);

export const render = (ui: ReactElement): RenderResult => {
  return rtlRender(ui, { wrapper: Providers });
};
