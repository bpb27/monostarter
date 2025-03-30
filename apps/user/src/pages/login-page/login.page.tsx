import { Box, Button, Card, Center, ColorModeButton, Field, Heading, Input } from "@repo/design";
import { Link } from "~/components/link";
import { ROUTES } from "~/core/routes";
import { useForm } from "~/utils/use-form";
import { LoginForm, useLoginPageData } from "./login.data";

export type LoginPageProps = ReturnType<typeof useLoginPageData>;

export const LoginPageUI = ({ handleSubmit, hasUser, isPending, error }: LoginPageProps) => {
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
