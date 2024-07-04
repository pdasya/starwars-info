import { ChangeEvent, KeyboardEvent, Component } from "react";
import styles from "./search-component.module.css";

interface SearchProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

class Search extends Component<SearchProps> {
  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.props.onSearch();
    }
  };

  render() {
    return (
      <div className={styles.searchWrapper}>
        <h1 className={styles.searchHeader}>
          Find info about your favourite Star Wars Character!
        </h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={this.props.searchTerm}
            onChange={this.props.onInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <button className={styles.searchButton} onClick={this.props.onSearch}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
