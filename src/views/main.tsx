import { ChangeEvent, FC, useEffect, useState } from "react";
import Search from "../components/search-component/search-component";
import Result from "../components/results-component/results-component";
import { fetchCharacters } from "../API/fetchResults";
import styles from "./main.module.css";
import { Character } from "../API/apiTypes";
import useSearchTerm from "../hooks/useSearchTerm";

const Main: FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm("searchString", "");
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorThrown, setIsErrorThrown] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toString());
  };

  const handleSearch = async () => {
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem("searchString", trimmedSearchTerm);

    setIsLoading(true);

    try {
      const results = await fetchCharacters();
      let filteredResults = results;

      if (trimmedSearchTerm !== "") {
        filteredResults = results.filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(trimmedSearchTerm.toLocaleLowerCase()),
        );
      }

      setSearchResults(filteredResults);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleThrowError = () => {
    setIsErrorThrown(true);
  };

  if (isErrorThrown) {
    throw new Error("Simulated render error");
  }

  return (
    <>
      <Search
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        onThrowError={handleThrowError}
      />
      {isLoading ? (
        <div className={styles.overlay}>
          <span className={styles.loader}>
            <span className={styles.loaderInner}></span>
          </span>
        </div>
      ) : (
        <Result results={searchResults} />
      )}
    </>
  );
};

export default Main;
