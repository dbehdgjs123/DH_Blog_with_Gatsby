/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react";
import GlobalContextProvider from "./src/context/GlobalContextProvider";
import "prismjs/themes/prism-solarizedlight.css";

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};

export const onServiceWorkerUpdateReady = () => {
  window.location.reload();
};
