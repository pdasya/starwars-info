import { Component } from "react";
import Search from "../components/search-component/search-component";
import Result from "../components/results-component/results-component";
import { Character, fetchCharacters } from "../API/fetchResults";
import styles from "./main.module.css";

interface MainState {
  searchTerm: string;
  searchResults: Character[];
  isLoading: boolean;
}

class Main extends Component<Record<string, never>, MainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem("searchString") || "",
      searchResults: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value.toString() });
  };

  handleSearch = async () => {
    const { searchTerm } = this.state;
    localStorage.setItem("searchString", searchTerm);

    this.setState({ isLoading: true });

    try {
      const results = await fetchCharacters();
      let filteredResults = results;

      if (searchTerm.trim() !== "") {
        filteredResults = results.filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        );
      }

      this.setState({ searchResults: filteredResults, isLoading: false });
    } catch (error) {
      console.error("Error fetching characters:", error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <>
        <Search
          searchTerm={this.state.searchTerm}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
        {this.state.isLoading ? (
          <div className={styles.loader}>Loading...</div>
        ) : (
          <Result results={this.state.searchResults} />
        )}
      </>
    );
  }
}

export default Main;
