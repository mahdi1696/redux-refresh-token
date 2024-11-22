import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  logOut,
  selectCurrentToken,
} from "@/lib/redux/features/auth/authSlice";
import { Link, NavLink } from "react-router-dom";

type Props = {};

export default function LoginLink({}: Props) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  if (token) {
    return (
      <Link to="/login" onClick={handleLogOut}>
        Logout
      </Link>
    );
  }

  return (
    <div>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "text-red-700" : "text-black")}
      >
        Login
      </NavLink>
    </div>
  );
}
