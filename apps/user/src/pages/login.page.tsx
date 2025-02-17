import { Box } from "@repo/ui/box";
import { Input } from "@repo/ui/input";
import { useAtom } from "jotai";
import { Link } from "react-router";
import * as v from "valibot";
import { ThemeButton } from "../components/theme-button";
import { atomUser } from "../core/state";
import { useForm } from "../utils/use-form";

const LoginForm = v.strictObject({
	email: v.pipe(v.string(), v.nonEmpty("Email is required"), v.email("Email must be a valid address")),
	password: v.pipe(v.string(), v.nonEmpty("Password is required"), v.minLength(8, "Password must be 8 characters")),
	age: v.number(),
});

export const LoginPage = () => {
	const [user, setUser] = useAtom(atomUser);
	const { fields, formData, isValid } = useForm(LoginForm, { email: "", password: "", age: 0 });
	return (
		<Box m="24px">
			<ThemeButton />
			<h1>Please login</h1>
			{!!user && <Link to="/">You are already logged in.</Link>}
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
				<Box display="flex" flexDirection="column" gap="8px">
					<Input {...fields.email} label="Email" />
					<Input {...fields.password} label="Password" type="password" />
					<button type="submit">Submit</button>
				</Box>
			</form>
		</Box>
	);
};
