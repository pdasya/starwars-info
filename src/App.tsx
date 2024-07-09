import "./App.css";
import Main from "./views/main/main";
import ErrorBoundary from "./components/error-boundary-component/error-boundary-component";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
