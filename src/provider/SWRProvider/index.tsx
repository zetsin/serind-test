import React, { FC, useEffect, useState } from "react";
import { SWRConfig } from "swr";
import Axios from "axios";
import { Box, CircularProgress, Modal } from "@material-ui/core";

const fetcher = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_OMDB_API_URL}`,
  responseType: "json",
});

export interface SWRProviderProps {}

const SWRProvider: FC<SWRProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    fetcher.interceptors.request.use(
      (config) => {
        setLoading(loading + 1);

        config.params = {
          apikey: `${process.env.NEXT_PUBLIC_OMDB_API_KEY}`,
        };

        return config;
      },
      (error) => {
        setLoading(loading > 0 ? loading - 1 : 0);

        return Promise.reject(error);
      }
    );

    fetcher.interceptors.response.use(
      (response) => {
        setLoading(loading > 0 ? loading - 1 : 0);

        return response;
      },
      (error) => {
        setLoading(loading > 0 ? loading - 1 : 0);

        return Promise.reject(error);
      }
    );
  }, []);

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
      <Modal open={loading > 0} disableEnforceFocus disableAutoFocus>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    </SWRConfig>
  );
};

export default SWRProvider;
