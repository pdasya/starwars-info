import * as React from "react";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./components/app-routes/app-routes";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import { ThemeContext } from "./contexts/themeContext";
import store from "@app/store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <Router>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </Router>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
