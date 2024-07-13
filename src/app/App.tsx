import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "../components/error-boundary-component/error-boundary-component";
import AppRoutes from "../components/app-routes/app-routes";

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
