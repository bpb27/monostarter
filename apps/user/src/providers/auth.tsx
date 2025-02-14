import { type FC, type PropsWithChildren, createContext, useContext } from "react";
import { Outlet } from "react-router";
import { LoginPage } from "../pages/login.page";
import { useLocalStorage } from "../utls/use-local-storage";

type AuthContextShape = {
	user: { email: string } | undefined;
};

const AuthContext = createContext<AuthContextShape>({ user: undefined });

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user] = useLocalStorage("user");
	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const Protected: FC = () => {
	const { user } = useAuthContext();
	if (!user) return <LoginPage />;
	return <Outlet />;
};
