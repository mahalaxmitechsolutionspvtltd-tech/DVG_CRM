import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, AuthProviderProps, User } from "../lib/types";
import axios from "axios";

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // ✅ IMPORTANT: start as true (we haven't checked session yet)
  const [isloading, setLoding] = useState(true);

  const URI = import.meta.env.VITE_REACT_BACKEND_URI;

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    setLoding(true); // ✅ block guards until request finishes
    try {
      const response = await axios.get(`${URI}/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      if (response.data?.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoding(false); // ✅ now guards can redirect safely
    }
  };

  const login = async (u: User) => {
    if (!u) return;
    setUser(u);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${URI}/api/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data?.success) setUser(null);
    } finally {
      localStorage.removeItem("auth");
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isloading,
    setLoding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
