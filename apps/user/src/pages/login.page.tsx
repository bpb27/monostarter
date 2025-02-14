import { Input } from "@repo/ui/input";
import { useMemo } from "react";
import { Link } from "react-router";
import * as v from "valibot";
import { useForm } from "../utls/use-form";
import { useLocalStorage } from "../utls/use-local-storage";

const LoginForm = v.strictObject({
	email: v.pipe(v.string(), v.nonEmpty("Email is required"), v.email("Email must be a valid address")),
	password: v.pipe(v.string(), v.nonEmpty("Password is required"), v.minLength(8, "Password must be 8 characters")),
	age: v.number(),
});

export const LoginPage = () => {
	const [user, setUser] = useLocalStorage("user");
	const [theme, setTheme] = useLocalStorage("theme");
	const { fields, formData, isValid } = useForm(LoginForm, { email: "", password: "", age: 0 });
	// biome-ignore lint/correctness/useExhaustiveDependencies: only check on load
	const alreadyLoggedIn = useMemo(() => !!user, []);
	return (
		<div style={{ margin: "24px" }}>
			<button onClick={() => setTheme(theme === "light" ? "dark" : "light")} type="button">
				Theme
			</button>
			<h1>Please login</h1>
			{alreadyLoggedIn && <Link to="/">You are already logged in.</Link>}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (isValid) {
						setUser({ email: formData.email });
						if (window.location.pathname.includes("/login")) {
							window.location.replace("/");
						} else {
							window.location.reload();
						}
					}
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
					<Input {...fields.email} label="Email" />
					<Input {...fields.password} label="Password" type="password" />
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};
