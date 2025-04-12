import { toaster } from "@repo/design";
import { Static, Type } from "@sinclair/typebox";
import { useAtom, useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import { api } from "~/core/api";
import { atomPathAfterLogin, atomUser } from "~/core/state";
import { patternSchema } from "~/utils/patterns";

export const LoginForm = Type.Object({
  email: patternSchema.email,
  password: patternSchema.password,
});

export const useLoginPageData = () => {
  const [user, setUser] = useAtom(atomUser);
  const redirectPath = useAtomValue(atomPathAfterLogin);
  const navigate = useNavigate();

  const login = api.login.useMutation({
    onSuccess: result => {
      setUser({ id: result.id });
      navigate(redirectPath);
    },
    onError: error => {
      toaster.create({ title: "Login was unsuccessful", description: error.message, type: "error" });
    },
  });

  const handleSubmit = (formData: Static<typeof LoginForm>) => {
    login.mutate(formData);
  };

  return {
    handleSubmit,
    hasUser: !!user,
    isPending: login.isPending,
  };
};
