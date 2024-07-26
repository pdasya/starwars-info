import type { AppProps } from "next/app";
import store from "../store/store";
import ErrorBoundary from "@components/error-boundary/error-boundary";
import { Provider } from "react-redux";
import { ThemeContext } from "@contexts/themeContext";
import { useState } from "react";
import "../App.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
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

export default MyApp;
