import { Button } from "@repo/ui/button";
import { useAtom } from "jotai";
import { atomTheme } from "../core/state";

export const ThemeButton = () => {
  const [theme, setTheme] = useAtom(atomTheme);
  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} variant="outline">
      Theme
    </Button>
  );
};
