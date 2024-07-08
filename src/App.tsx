import "./App.css";
import Main from "./views/main";
import ErrorBoundary from "./components/error-boundary-component/error-boundary-component";

const App = () => {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
};

export default App;
