import React, { FC } from "react";
import { SWRConfig } from "swr";
import Axios from "axios";

export const fetcher = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_OMDB_API_URL}`,
  responseType: "json",
});

fetcher.interceptors.request.use((config) => {
  config.params = {
    apikey: `${process.env.NEXT_PUBLIC_OMDB_API_KEY}`,
  };

  return config;
});

fetcher.interceptors.response.use((response) => {
  return response;
});

export interface SWRProviderProps {}

const SWRProvider: FC<SWRProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (url) => {
          const { data } = await fetcher.get(url);

          return data;
        },
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
