import React, { FC } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export const cache = createCache({ key: "css", prepend: true });
cache.compat = true;

export interface EmotionProviderProps {}

const EmotionProvider: FC<EmotionProviderProps> = ({ children }) => {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default EmotionProvider;
