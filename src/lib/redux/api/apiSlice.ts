import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredential, logOut } from "../features/auth/authSlice";
import { RootState } from "../store/store";
import memoize from "memoizee";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOption: {}
) => {
  let result = await baseQuery(args, api, extraOption);

  if (
    result.error?.status == "PARSING_ERROR" &&
    result.error?.originalStatus === 401
  ) {
    const refreshResult = await memoQuery(
      { url: "/authentication/refreshToken", method: "POST" },
      api!,
      extraOption!
    );
    if (refreshResult.data) {
      const data = refreshResult.data as { accessToken: string };
      const rootState = api?.getState() as any as RootState;
      const user = rootState.auth.user;
      api?.dispatch(setCredential({ user, token: data.accessToken }));
      //retry the original query with new access token
      result = await baseQuery(args, api!, extraOption!);
    } else {
      api?.dispatch(logOut());
    }
  }
  return result;
};

const memoQuery = memoize(baseQuery, {
  maxAge: 10_000,
  length: 0,
  promise: true,
});

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
