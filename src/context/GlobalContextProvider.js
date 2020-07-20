import React, { useReducer, createContext } from "react";
import PropTypes from "prop-types";
//import { Helmet } from "react-helmet";

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

/*function getInitialColor() {
  if (typeof window !== `undefined`) {
    const themeColor = window.localStorage.getItem("themeColor"); //로컬 스토리지에서 theme키를 가져온다.
    const hasThemeColor = typeof themeColor === "string";

    if (hasThemeColor) {
      return themeColor;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)"); //사용자의 시스템이 라이트인지 다크인지를 가져온다.
    const hasMediaQueryPreference = typeof mql.matches === "boolean";

    if (hasMediaQueryPreference) {
      return mql.matches ? "dark" : "light";
    }

    return "light"; //아무것도 아니면 기본인 light를 테마로 사용한다.
  } else {
    return "light";
  }
}*/

const initialState = {
  theme: typeof window !== "undefined" ? window.__theme : "light",
};
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME": {
      window.__setPreferredTheme(state.theme === "light" ? "dark" : "light");

      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    }

    default:
      throw new Error("액션 없음");
  }
}

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}
GlobalContextProvider.propTypes = {
  children: PropTypes.any,
};

export default GlobalContextProvider;
