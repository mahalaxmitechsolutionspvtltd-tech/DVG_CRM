import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./auth/AuthProvider";

export default function ProtectedRoutes() {
    const { user, isloading } = useAuth();


    if (isloading) {
        <div>loading ...</div>
    }

    if (!user) return <Navigate to="/login" replace />

    return <Outlet />

}
