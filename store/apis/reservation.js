import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reservationsApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (build) => ({
    getReservations: build.query({
      query: () => "/reservations"
    })
  })
});

export const { useGetReservationsQuery } = reservationsApi;
