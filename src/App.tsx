import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useState } from "react";
import "./App.css";
import store from "@store/store";
import { ThemeContext } from "@contexts/themeContext";
import ErrorBoundary from "@components/error-boundary/error-boundary";

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <ErrorBoundary>
          <Component {...pageProps} router={router} />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default MyApp;
