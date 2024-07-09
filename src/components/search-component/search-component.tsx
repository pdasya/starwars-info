import { ChangeEvent, KeyboardEvent, FC } from "react";
import styles from "./search-component.module.css";

interface SearchProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onThrowError: () => void;
}

const Search: FC<SearchProps> = ({
  searchTerm,
  onInputChange,
  onSearch,
  onThrowError,
}) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const handleSubmit = () => {
    onSearch();
  };

  return (
    <div className={styles.searchWrapper}>
      <h1 className={styles.searchHeader}>
        Find info about your favourite Star Wars Character!
      </h1>
      <div className={styles.searchContainer}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search..."
          value={searchTerm}
          onChange={onInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className={styles.searchButton} onClick={handleSubmit}>
          Search
        </button>
      </div>
      <button className={styles.errorButton} onClick={onThrowError}>
        Throw error
      </button>
    </div>
  );
};

export default Search;
