import "../styles/globals.css";
import "next/head";
import React from "react";
import Appbar from "../src/components/AppBar";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <div>
        <Appbar></Appbar>
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
}

export default MyApp;
