import { ChangeEvent, KeyboardEvent, FC, useContext } from "react";
import styles from "./search-component.module.css";
import { ThemeContext } from "../../contexts/themeContext";

interface SearchProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const Search: FC<SearchProps> = ({ searchTerm, onInputChange, onSearch }) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const handleSubmit = () => {
    onSearch();
  };

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div
      className={`${styles.searchWrapper} ${darkTheme ? styles.darkThemeSearchWrapper : ""}`}
    >
      <button onClick={toggleTheme}>lalala</button>
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
    </div>
  );
};

export default Search;
