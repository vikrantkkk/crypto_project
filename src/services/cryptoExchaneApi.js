import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.coingecko.com/api/v3";

export const cryptoExchangeApi = createApi({
  reducerPath: "cryptoExchangeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () =>
        "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
    }),
  }),
});

export const { useGetExchangesQuery } = cryptoExchangeApi;
