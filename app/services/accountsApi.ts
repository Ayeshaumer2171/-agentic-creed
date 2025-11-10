import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountsApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gateway-aac.apiswagger.co.uk/",
    prepareHeaders: (headers) => {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("token")
          : null;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({

    getAccounts: builder.query({
      query: () => "auth/accounts",
    }),


    selectAccount: builder.mutation({
      query: (body) => ({
        url: "auth/accounts/select",
        method: "POST",
        body,
        
      }),
    }),

  }),
});

export const {useGetAccountsQuery ,useSelectAccountMutation } = accountsApi;
