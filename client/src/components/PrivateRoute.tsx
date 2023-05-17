import useUser from "@src/api/hooks/useUser";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const { data: user } = useUser();
    return user ? <Outlet /> : <Navigate to="/auth" />;
}
