import { apiSlice } from "../../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation<
      { accessToken: string },
      { userName: string; password: string }
    >({
      query: (credentials) => ({
        url: "/authentication/loginCookie",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    checkToken: builder.query<{}, {}>({
      query: (input) => ({
        url: "/checkRefreshToken",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: input,
      }),
      keepUnusedDataFor: 0,
    }),
    getTokenWithRefreshToken: builder.query<{ accessToken: string }, void>({
      query: () => ({
        url: "/authentication/getSessionWithRefreshToken",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useLogInMutation,
  useCheckTokenQuery,
  useLazyCheckTokenQuery,
  useLazyGetTokenWithRefreshTokenQuery,
} = authApi;
