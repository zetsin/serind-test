import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Provider from "provider";
import Header from "containers/Header";
import Body from "containers/Body";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <Provider>
      <Head>
        <title>Serind’s Front End Take Home Test</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header />
      <Body>
        <Component {...pageProps} />
      </Body>
    </Provider>
  );
};

export default App;
