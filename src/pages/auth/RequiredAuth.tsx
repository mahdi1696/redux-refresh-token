import { useAppSelector } from "@/hooks/redux";
import { selectCurrentToken } from "@/lib/redux/features/auth/authSlice";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function RequiredAuth() {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
