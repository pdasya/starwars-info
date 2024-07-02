import { ChangeEvent, Component } from "react";
import styles from "./search-component.module.css";

interface SearchState {
  searchTerm: string;
}

class Search extends Component<Record<string, never>, SearchState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem("searchString") || " ",
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem("searchString", searchTerm);
  };

  render() {
    return (
      <div className={styles.searchWrapper}>
        <h1 className={styles.searchHeader}>
          Find your favourite Star Wars Character!
        </h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
          />
          <button className={styles.searchButton} onClick={this.handleSearch}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
