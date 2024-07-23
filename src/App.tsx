import { Component } from "react";
import "./App.css";
import Main from "./views/main";
import ErrorBoundary from "./components/error-boundary-component/error-boundary-component";

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    );
  }
}

export default App;
