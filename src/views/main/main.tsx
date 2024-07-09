import { ChangeEvent, FC, useEffect, useState } from "react";
import Search from "../../components/search-component/search-component";
import Result from "../../components/results-component/results-component";
import { fetchCharacters } from "../../API/fetchResults";
import styles from "./main.module.css";
import { Character } from "../../API/apiTypes";
import useSearchTerm from "../../hooks/useSearchTerm";
import { useSearchParams } from "react-router-dom";

const Main: FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm("searchString", "");
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toString());
  };

  const handleSearch = async (term: string = searchTerm) => {
    const trimmedSearchTerm = term.trim();
    localStorage.setItem("searchString", trimmedSearchTerm);
    setSearchParams({ search: trimmedSearchTerm }, { replace: false });

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
    if (searchQuery) {
      setSearchTerm(searchQuery);
      handleSearch(searchQuery);
    } else {
      handleSearch();
    }
  }, [searchQuery]);

  return (
    <>
      <Search
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
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
