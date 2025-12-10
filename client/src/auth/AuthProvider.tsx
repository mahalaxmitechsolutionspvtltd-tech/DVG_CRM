import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, AuthProviderProps, User } from "../lib/types";
// import { Outlet } from 'react-router-dom';



const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(null);
    const [isloading, setLoding] = useState(false);

    useEffect(() => {

        const checkAuth = async() => {
            try {
                const data = localStorage.getItem('auth');
                if (!data) return;
                setUser(JSON.parse(data));

                setLoding(false);
            } catch (error) {

            } finally {

            }
        }

        checkAuth();
    }, []);



    const login = async (user: User) => {
        if (!user) return;
        setUser(user);
        localStorage.setItem("auth", JSON.stringify(user));
    }

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('auth');
    }

    const value: AuthContextType = {
        user,
        login,
        logout,
        isloading,
        setLoding,

    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}