import { Component } from "react";
import styles from "./search-component.module.css";

class Search extends Component {
  render() {
    return (
      <div className={styles.searchWrapper}>
        <h1>Find your favourite Star Wars Item!</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
          />
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>
    );
  }
}

export default Search;
