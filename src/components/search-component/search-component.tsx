import { ChangeEvent, KeyboardEvent, FC, useContext } from "react";
import styles from "./search-component.module.css";
import { ThemeContext } from "../../contexts/themeContext";
import Toggle from "../theme-toggle-component/theme-toggle-component";

interface SearchProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const Search: FC<SearchProps> = ({ searchTerm, onInputChange, onSearch }) => {
  const { darkTheme } = useContext(ThemeContext);
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const handleSubmit = () => {
    onSearch();
  };

  return (
    <div
      className={`${styles.searchWrapper} ${darkTheme ? styles.darkThemeSearchWrapper : ""}`}
    >
      <Toggle />
      <h1
        className={`${styles.searchHeader} ${darkTheme ? styles.darkThemeSearchHeader : ""}`}
      >
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
        <button
          className={`${styles.searchButton} ${darkTheme ? styles.darkThemeSearchButton : ""}`}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
