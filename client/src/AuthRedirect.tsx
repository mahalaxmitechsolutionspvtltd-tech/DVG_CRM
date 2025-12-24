
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import DashboardSkeleton from "./pages/DashboardSkeleton";

export default function AuthRedirect() {

    const { user, isloading } = useAuth();
    console.log(user?.role);
    if (isloading) {
        return <div className=" container max-w-lg mx-auto ">
            <DashboardSkeleton />
        </div>;
    }
    if (user) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

