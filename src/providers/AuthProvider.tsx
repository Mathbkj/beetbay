import { ReactNode, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const handleLogin = async (email: string, password: string) => {
    setUser({ email, password, tier: "free" });
  };
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
