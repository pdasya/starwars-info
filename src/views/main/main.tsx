import { ChangeEvent, FC, useEffect, useState } from "react";
import Search from "../../components/search-component/search-component";
import Result from "../../components/results-component/results-component";
import { fetchCharacters } from "../../API/fetchResults";
import styles from "./main.module.css";
import { Character } from "../../API/apiTypes";
import useSearchTerm from "../../hooks/useSearchTerm";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/pagination-component/pagination-component";
import Details from "../../components/details-component/details-component";

const Main: FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm("searchString", "");
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(localStorage.getItem("currentPage")),
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);

  // const navigate = useNavigate();
  const searchQuery = searchParams.get("search") || "";
  const pageQuery =
    searchParams.get("page") || localStorage.getItem("currentPage");
  // const detailsQuery = searchParams.get("details") || "";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toString());

    setCurrentPage(1);
    setSearchParams({ search: searchTerm, page: "1" }, { replace: false });
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

  const fetchCharacterDetails = async (character: Character) => {
    setIsDetailLoading(true);
    try {
      const response = await fetch(character.url);
      const data = await response.json();
      setSelectedCharacter(data);
      setIsDetailLoading(false);
    } catch (error) {
      console.error("Error fetching character details:", error);
      setIsDetailLoading(false);
    }
  };

  useEffect(() => {
    const page = Number(pageQuery);
    // setCurrentPage(page);
    // console.log(currentPage);

    if (searchQuery) {
      setSearchTerm(searchQuery);
      handleSearch(searchQuery, page);
    } else {
      handleSearch(searchTerm, page);
    }

    // if (detailsQuery) {
    //   const character = searchResults.find(c => c.url.split('/').slice(-2, -1)[0] === detailsQuery);
    //   if (character) {
    //     fetchCharacterDetails(character);
    //   }
    // }
  }, [searchQuery, pageQuery]);

  const handlePageChange = (page: number) => {
    setSearchParams(
      {
        search: searchTerm,
        page: page.toString(),
        details: selectedCharacter
          ? selectedCharacter.url.split("/").slice(-2, -1)[0]
          : "",
      },
      { replace: false },
    );
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
    handleSearch(searchTerm, page);
  };

  useEffect(() => {
    if (currentPage !== Number(pageQuery)) {
      setSearchParams(
        {
          search: searchTerm,
          page: currentPage.toString(),
          details: selectedCharacter
            ? selectedCharacter.url.split("/").slice(-2, -1)[0]
            : "",
        },
        { replace: false },
      );
    }

    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const handleItemClick = (character: Character) => {
    fetchCharacterDetails(character);
    setSearchParams(
      {
        search: searchTerm,
        page: currentPage.toString(),
        details: character.url.split("/").slice(-2, -1)[0],
      },
      { replace: false },
    );
  };

  const handleItemClose = () => {
    setSearchParams(
      { search: searchTerm, page: currentPage.toString() },
      { replace: false },
    );
    setSelectedCharacter(null);
  };

  return (
    <div className={styles.mainContainer}>
      <div
        className={`${styles.searchResults} ${selectedCharacter ? styles.withDetails : ""}`}
        onClick={handleItemClose}
      >
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
            <Result results={searchResults} onItemClick={handleItemClick} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      {selectedCharacter && (
        <div className={styles.detailsSection}>
          {isDetailLoading ? (
            <div className={styles.overlay}>
              <span className={styles.loader}>
                <span className={styles.loaderInner}></span>
              </span>
            </div>
          ) : (
            <Details details={selectedCharacter} onClose={handleItemClose} />
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
