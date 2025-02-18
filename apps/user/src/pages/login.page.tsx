import { Box } from "@repo/ui/box";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useAtom } from "jotai";
import * as v from "valibot";
import { Link } from "../components/link";
import { ThemeButton } from "../components/theme-button";
import { ROUTES } from "../core/routes";
import { atomUser } from "../core/state";
import { useForm } from "../utils/use-form";

const LoginForm = v.strictObject({
	email: v.pipe(v.string(), v.nonEmpty("Email is required"), v.email("Email must be a valid address")),
	password: v.pipe(v.string(), v.nonEmpty("Password is required"), v.minLength(8, "Password must be 8 characters")),
});

export const LoginPage = () => {
	const [user, setUser] = useAtom(atomUser);
	const { fields, formData, formIsValid } = useForm(LoginForm, { email: "", password: "" });
	return (
		<Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
			<ThemeButton />
			<h1>Login</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (formIsValid) {
						setUser({ email: formData.email });
						if (window.location.pathname.includes(ROUTES.LOGIN)) {
							window.location.replace(ROUTES.HOME);
						} else {
							window.location.reload();
						}
					}
				}}
			>
				<Box display="flex" flexDirection="column" gap="16px">
					<Input {...fields.email} label="Email" />
					<Input {...fields.password} label="Password" type="password" />
					<Button type="submit" size="3">
						Submit
					</Button>
					{!!user && <Link to={ROUTES.HOME}>You are already logged in.</Link>}
				</Box>
			</form>
		</Box>
	);
};
