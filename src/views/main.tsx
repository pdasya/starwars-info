import { Component } from "react";
import Search from "../components/search-component/search-component";
import Result from "../components/results-component/results-component";
import { Character, fetchCharacters } from "../API/fetchResults";

interface MainState {
  searchTerm: string;
  searchResults: Character[];
}

class Main extends Component<Record<string, never>, MainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem("searchString") || " ",
      searchResults: [],
    };
  }

  componentDidMount() {
    if (this.state.searchTerm) {
      this.handleSearch();
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = async () => {
    const { searchTerm } = this.state;
    localStorage.setItem("searchString", searchTerm);

    try {
      const results = await fetchCharacters();
      const filteredResults = results.filter((person) =>
        person.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()),
      );
      this.setState({ searchResults: filteredResults });
    } catch (error) {
      console.error("Error fetching characters:", error);
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
        <Result results={this.state.searchResults} />
      </>
    );
  }
}

export default Main;
