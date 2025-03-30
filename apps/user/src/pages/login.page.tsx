import { Box, Button, Card, Center, ColorModeButton, Field, Heading, Input } from "@repo/design";
import { useAtom, useAtomValue } from "jotai";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import * as v from "valibot";
import { Link } from "../components/link";
import { api } from "../core/api";
import { ROUTES } from "../core/routes";
import { atomPathAfterLogin, atomUser } from "../core/state";
import { type Form, useForm } from "../utils/use-form";

const LoginForm = v.object({
  email: v.pipe(v.string(), v.nonEmpty("Email is required"), v.email("Email must be a valid address")),
  password: v.pipe(v.string(), v.nonEmpty("Password is required"), v.minLength(8, "Password must be 8 characters")),
});

export const useLoginPageData = () => {
  const [user, setUser] = useAtom(atomUser);
  const redirectPath = useAtomValue(atomPathAfterLogin);
  const navigate = useNavigate();

  const login = api.login.useMutation({
    onSuccess: (result) => {
      setUser({ id: result.id });
      navigate(redirectPath);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>, form: Form<typeof LoginForm>) => {
    e.preventDefault();
    if (form.isValid) login.mutate(form.data);
  };

  return {
    handleSubmit,
    hasUser: !!user,
    isPending: login.isPending,
    error: login.error,
  };
};

type Props = ReturnType<typeof useLoginPageData>;

export const LoginPageUI = ({ handleSubmit, hasUser, isPending, error }: Props) => {
  const form = useForm(LoginForm, { email: "", password: "" });
  return (
    <Box>
      <Box>
        <ColorModeButton />
      </Box>
      <Center>
        <Card.Root maxW="lg" size="lg">
          <Card.Header>
            <Heading size="xl" textAlign="center">
              Login
            </Heading>
          </Card.Header>
          <Card.Body>
            <form onSubmit={(e) => handleSubmit(e, form)}>
              <Box display="flex" flexDirection="column" gap="4">
                <Field label="Email" errorText={form.fields.email.error} invalid={!!form.fields.email.error}>
                  <Input
                    name={form.fields.email.name}
                    value={form.fields.email.value}
                    onChange={form.fields.email.onChange}
                  />
                </Field>
                <Field label="Password" errorText={form.fields.password.error} invalid={!!form.fields.password.error}>
                  <Input
                    name={form.fields.password.name}
                    value={form.fields.password.value}
                    onChange={form.fields.password.onChange}
                    type="password"
                  />
                </Field>
                <Button type="submit" disabled={isPending}>
                  Submit
                </Button>
                {error && <p>{error.message}</p>}
                {hasUser && <Link to={ROUTES.HOME}>You are already logged in.</Link>}
              </Box>
            </form>
          </Card.Body>
        </Card.Root>
      </Center>
    </Box>
  );
};

export const LoginPage = () => {
  const loginPageData = useLoginPageData();
  return <LoginPageUI {...loginPageData} />;
};
