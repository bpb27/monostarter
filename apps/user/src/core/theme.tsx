import { Theme } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import type { FC, PropsWithChildren } from "react";
import { atomTheme } from "./state";

export const ThemeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useAtomValue(atomTheme);
  return (
    <Theme appearance={theme} accentColor="iris">
      {children}
    </Theme>
  );
};
