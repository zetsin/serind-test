import React, { FC } from "react";
import EmotionProvider from "./EmotionProvider";
import MuiProvider from "./MuiProvider";
import DateProvider from "./DateProvider";
import SWRProvider from "./SWRProvider";

export interface ProviderProps {}

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <EmotionProvider>
      <MuiProvider>
        <DateProvider>
          <SWRProvider>{children}</SWRProvider>
        </DateProvider>
      </MuiProvider>
    </EmotionProvider>
  );
};

export default Provider;
