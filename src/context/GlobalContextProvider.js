import React, { useReducer, createContext } from "react";
import PropTypes from "prop-types";
//import { Helmet } from "react-helmet";

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const initialState = {
  theme: typeof window !== "undefined" ? window.__theme : "light",
};
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME": {
      window.__setPreferredTheme(state.theme === "light" ? "dark" : "light");
      document.body.style.transition = "all 0.5s";
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
