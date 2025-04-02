import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabaseClient";
import { OAuthResponse, AuthError, Provider, User } from "@supabase/supabase-js";
type AuthContextType = {
  signIn: (data: { provider: Provider }) => Promise<OAuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
  user: User | null;
};
const AuthContext = createContext<AuthContextType | null>(null);
function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const setSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    setSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_envent, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
  const value: AuthContextType = {
    signIn: (data) => supabase.auth.signInWithOAuth(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
