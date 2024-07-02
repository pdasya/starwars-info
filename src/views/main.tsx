import { Component } from "react";
import Search from "../components/search-component/search-component";
import Result from "../components/results-component/results-component";

class Main extends Component {
  render() {
    return (
      <>
        <Search />
        <Result />
      </>
    );
  }
}

export default Main;
