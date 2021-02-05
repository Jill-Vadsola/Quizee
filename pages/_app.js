import "next/head";
import React from "react";
import Appbar from "../src/components/AppBar";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <head></head>
      <div>
        <Appbar></Appbar>
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
}

export default MyApp;
