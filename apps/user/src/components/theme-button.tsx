import { useAtom } from "jotai";
import { atomTheme } from "../core/state";

export const ThemeButton = () => {
	const [theme, setTheme] = useAtom(atomTheme);
	return (
		<button onClick={() => setTheme(theme === "light" ? "dark" : "light")} type="button">
			Theme
		</button>
	);
};
