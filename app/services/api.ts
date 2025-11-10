import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://gateway-aac.apiswagger.co.uk/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    signin: builder.mutation<any, { email: string; password: string; timezone?: string }>({
      query: (body) => ({
        url: "auth/signin",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSigninMutation } = api;
