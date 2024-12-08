import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useLazyGetTokenWithRefreshTokenQuery } from "@/lib/redux/features/auth/authApi";
import {
  selectCurrentToken,
  setCredential,
} from "@/lib/redux/features/auth/authSlice";
import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function RequiredAuth() {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [getToken, { isFetching, isError, isLoading, isUninitialized }] =
    useLazyGetTokenWithRefreshTokenQuery();

  console.log({ token, isFetching, isError, isLoading, isUninitialized });

  useEffect(() => {
    if (!token) {
      getToken().then((res) => {
        if (res.isSuccess && res.data) {
          dispatch(
            setCredential({
              token: res.data.accessToken,
            })
          );
        }
      });
    }
  }, []);

  if ((!token || isFetching) && !isError) {
    return <p>loading...</p>;
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
