import { Component } from "react";
import Search from "../components/search-component/search-component";
import Result from "../components/results-component/results-component";
import { Character, fetchCharacters } from "../API/fetchResults";
import styles from "./main.module.css";

interface MainState {
  searchTerm: string;
  searchResults: Character[];
  isLoading: boolean;
  isErrorThrown: boolean;
}

class Main extends Component<Record<string, never>, MainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem("searchString") || "",
      searchResults: [],
      isLoading: false,
      isErrorThrown: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleThrowError = this.handleThrowError.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchTerm: event.target.value.toString() });
  }

  async handleSearch() {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    localStorage.setItem("searchString", trimmedSearchTerm);

    this.setState({ isLoading: true });

    try {
      const results = await fetchCharacters();
      let filteredResults = results;

      if (trimmedSearchTerm.trim() !== "") {
        filteredResults = results.filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(trimmedSearchTerm.toLocaleLowerCase()),
        );
      }

      this.setState({ searchResults: filteredResults, isLoading: false });
    } catch (error) {
      console.error("Error fetching characters:", error);
      this.setState({ isLoading: false });
    }
  }

  handleThrowError() {
    this.setState({ isErrorThrown: true });
  }

  render() {
    if (this.state.isErrorThrown) {
      throw new Error("Simulated render error");
    }

    return (
      <>
        <Search
          searchTerm={this.state.searchTerm}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearch}
          onThrowError={this.handleThrowError}
        />
        {this.state.isLoading ? (
          <div className={styles.overlay}>
            <span className={styles.loader}>
              <span className={styles.loaderInner}></span>
            </span>
          </div>
        ) : (
          <Result results={this.state.searchResults} />
        )}
      </>
    );
  }
}

export default Main;
