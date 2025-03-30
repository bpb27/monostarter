import { useAtom, useAtomValue } from "jotai";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import * as v from "valibot";
import { api } from "../../core/api";
import { atomPathAfterLogin, atomUser } from "../../core/state";
import type { Form } from "../../utils/use-form";

export const LoginForm = v.object({
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
