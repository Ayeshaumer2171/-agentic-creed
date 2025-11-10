import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketsApi = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gateway-aac.apiswagger.co.uk/",
    prepareHeaders: (headers) => {
      const token =
        typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("accept", "*/*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
        getTickets: builder.query<any, { page?: number; limit?: number; search?: string } | void>({
      query: (args) => {
        const params: Record<string, any> = {};
        if (args && typeof args === "object") {
          if (args.page) params.page = args.page;
          if (args.limit) params.limit = args.limit;
          if (args.search) params.search = args.search;
        }
        return {
          url: "ticket",
          params,
        };
      },
    }),
  }),
});

export const { useGetTicketsQuery } = ticketsApi;
