import { Box } from "@repo/ui/box";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useAtom, useAtomValue } from "jotai";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import * as v from "valibot";
import { Link } from "../components/link";
import { ThemeButton } from "../components/theme-button";
import { api } from "../core/api";
import { ROUTES } from "../core/routes";
import { atomPathAfterLogin, atomUser } from "../core/state";
import { useForm } from "../utils/use-form";

const LoginForm = v.strictObject({
	email: v.pipe(v.string(), v.nonEmpty("Email is required"), v.email("Email must be a valid address")),
	password: v.pipe(v.string(), v.nonEmpty("Password is required"), v.minLength(8, "Password must be 8 characters")),
});

export const LoginPage = () => {
	const [user, setUser] = useAtom(atomUser);
	const redirectPath = useAtomValue(atomPathAfterLogin);
	const navigate = useNavigate();
	const form = useForm(LoginForm, { email: "", password: "" });

	const login = api.login.useMutation({
		onSuccess: (result) => {
			setUser({ id: result.id });
			navigate(redirectPath);
		},
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (form.isValid) login.mutate(form.data);
	};

	return (
		<Box variant="pageCenter">
			<Box variant="topRight">
				<ThemeButton />
			</Box>
			<h1>Login</h1>
			<Box maxWidth="400px" width="100%" padding="16px">
				<form onSubmit={handleSubmit}>
					<Box variant="stack">
						<Input {...form.fields.email} label="Email" />
						<Input {...form.fields.password} label="Password" type="password" />
						<Button type="submit" size="3" disabled={login.isPending}>
							Submit
						</Button>
						{login.error && <p>{login.error.message}</p>}
						{!!user && <Link to={ROUTES.HOME}>You are already logged in.</Link>}
					</Box>
				</form>
			</Box>
		</Box>
	);
};
