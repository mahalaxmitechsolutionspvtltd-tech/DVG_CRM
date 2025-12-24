import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import DashboardSkeleton from "./pages/DashboardSkeleton";

export default function ProtectedRoute() {
    const { user, isloading } = useAuth();
    const location = useLocation();

    if (isloading) {
        return (
            <div className="">
                <DashboardSkeleton />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
