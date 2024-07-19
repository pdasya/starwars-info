import * as React from "react";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./components/app-routes/app-routes";
import ErrorBoundary from "./components/error-boundary-component/error-boundary-component";
import { ThemeContext } from "./contexts/themeContext";

const App: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <Router>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
