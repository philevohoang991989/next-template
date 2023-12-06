"use client";
import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    // Accept: 'application/json',
    "Content-Type": "application/json",
  },
  timeout: 30000,
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.token) {
      config.headers["Authorization"] = `Bearer ${session.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
);

export default axiosInstance;
