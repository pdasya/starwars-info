import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "../components/error-boundary-component/error-boundary-component";
import AppRoutes from "../components/app-routes/app-routes";
import "./App.css";
import { ThemeContext } from "../contexts/themeContext";

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
