/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react";
import GlobalContextProvider from "./src/context/GlobalContextProvider";

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme",
      dangerouslySetInnerHTML: {
        __html: `(() => {
          function setTheme(newTheme) {
            preferredTheme = newTheme;
            document.body.className = newTheme;
          }
          let preferredTheme
          try {
            preferredTheme = localStorage.getItem('themeColor')
          } catch (err) {}

          window.__setPreferredTheme = newTheme => {
            setTheme(newTheme)
            try {
              localStorage.setItem('themeColor',newTheme)
            } catch (err) {}
          }
          let darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
            darkQuery.addListener(e => {
              window.__setPreferredTheme(e.matches ? 'light' : 'dark')
            })

            setTheme(preferredTheme || (darkQuery.matches ? 'light' : 'dark'))
        })()`,
      },
    }),
  ]);
};
