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
  const answer = window.confirm(
    `어플리케이션이 업데이트 되었습니다. ` + `새로고침 하시겠습니까?`
  );
  if (answer === true) {
    window.location.reload();
  }
};
