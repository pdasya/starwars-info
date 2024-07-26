import * as React from "react";
import { useState } from "react";
import "./App.css";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import { ThemeContext } from "./contexts/themeContext";
import store from "@store/store";
import { Provider } from "react-redux";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
