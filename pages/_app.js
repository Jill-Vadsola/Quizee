import "next/head";
import React from "react";
import Appbar from "../src/components/AppBar";
import "antd/dist/antd.css";
import Head from "next/head"
function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quizee</title>
        <link rel="icon"></link>
      </Head>
      <div>
        <Appbar></Appbar>
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
}

export default MyApp;
