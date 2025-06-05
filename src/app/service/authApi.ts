import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config";
import {LoginCredentials, LoginResponse } from "../../interfaces/auth";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBasePath+"/api",
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token != "") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/telegram-login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  refetchOnFocus: false,
  refetchOnReconnect: false,
});

export const { useLoginMutation } = authApi;
