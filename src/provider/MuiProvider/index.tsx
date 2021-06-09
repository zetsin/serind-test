import React, { FC } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "./theme";

export interface MuiProviderProps {}

export const MuiProvider: FC<MuiProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiProvider;
