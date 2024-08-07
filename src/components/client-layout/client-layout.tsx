"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "@store/store";
import { ThemeContext } from "@contexts/themeContext";
import ErrorBoundary from "@components/error-boundary/error-boundary";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <ErrorBoundary>
          <div id="root">{children}</div>
        </ErrorBoundary>
      </ThemeContext.Provider>
    </Provider>
  );
}
