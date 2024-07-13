import "./App.css";
import Main from "../views/main/main-page";
import ErrorBoundary from "../components/error-boundary-component/error-boundary-component";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ErrorPage from "../views/error-page/error-page";

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
