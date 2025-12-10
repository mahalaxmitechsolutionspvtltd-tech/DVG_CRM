// AuthRedirect.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";


export default function AuthRedirect() {
    const { user, isloading } = useAuth();


    if (isloading) {
        <div>loading ...</div>
    }

    if (user) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}