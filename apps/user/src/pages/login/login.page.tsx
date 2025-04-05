import { Box, Button, Card, Center, ColorModeButton, Field, Heading, Input, Text } from "@repo/design";
import { Link } from "~/components/link";
import { ROUTES } from "~/core/routes";
import { useForm } from "~/utils/use-form";
import { LoginForm, useLoginPageData } from "./login.data";

export type LoginPageUIProps = ReturnType<typeof useLoginPageData>;

export const LoginPageUI = ({ handleSubmit, hasUser, isPending, error }: LoginPageUIProps) => {
  const form = useForm(LoginForm, { email: "", password: "" });
  return (
    <Box>
      <Box>
        <ColorModeButton />
      </Box>
      <Center>
        <Card.Root maxW="lg" size="lg">
          <Card.Header>
            <Heading size="2xl" textAlign="center">
              Login
            </Heading>
          </Card.Header>
          <Card.Body>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Box display="flex" flexDirection="column" gap="4">
                <Field label="Email" errorText={form.errors.email} invalid={!!form.errors.email}>
                  <Input {...form.fields.email} />
                </Field>
                <Field label="Password" errorText={form.errors.password} invalid={!!form.errors.password}>
                  <Input {...form.fields.password} type="password" />
                </Field>
                <Button type="submit" disabled={isPending}>
                  Submit
                </Button>
                {error && <Text color="red">{error.message}</Text>}
                {hasUser && <Link to={ROUTES.ROOT}>You are already logged in.</Link>}
              </Box>
            </form>
          </Card.Body>
        </Card.Root>
      </Center>
    </Box>
  );
};

export const LoginPage = () => {
  const props = useLoginPageData();
  return <LoginPageUI {...props} />;
};
