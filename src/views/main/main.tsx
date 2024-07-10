import { ChangeEvent, FC, useEffect, useState } from "react";
import Search from "../../components/search-component/search-component";
import Result from "../../components/results-component/results-component";
import { fetchCharacters } from "../../API/fetchResults";
import styles from "./main.module.css";
import { Character } from "../../API/apiTypes";
import useSearchTerm from "../../hooks/useSearchTerm";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/pagination-component/pagination-component";

const Main: FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm("searchString", "");
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const searchQuery = searchParams.get("search") || "";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toString());
  };

  const handleSearch = async (term: string, page: number = 1) => {
    const trimmedSearchTerm = term.trim();
    localStorage.setItem("searchString", trimmedSearchTerm);
    setSearchParams(
      { search: trimmedSearchTerm, page: page.toString() },
      { replace: false },
    );

    setIsLoading(true);

    try {
      const data = await fetchCharacters(trimmedSearchTerm, page);
      setSearchResults(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);

    if (searchQuery) {
      setSearchTerm(searchQuery);
      handleSearch(searchQuery, page);
    } else {
      handleSearch(searchTerm, page);
    }
  }, [searchQuery, searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch(searchTerm, page);
  };

  return (
    <>
      <Search
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
        onSearch={() => handleSearch(searchTerm, 1)}
      />
      {isLoading ? (
        <div className={styles.overlay}>
          <span className={styles.loader}>
            <span className={styles.loaderInner}></span>
          </span>
        </div>
      ) : (
        <>
          <Result results={searchResults} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default Main;
