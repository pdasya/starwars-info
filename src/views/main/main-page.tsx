import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { fetchCharacters } from "../../API/fetchResults";
import styles from "./main-page.module.css";
import { ICharacter } from "../../API/apiTypes";
import useSearchTerm from "../../hooks/useSearchTerm";
import { useSearchParams } from "react-router-dom";
import DetailsSection from "../../modules/details-module/details-module";
import SearchSection from "../../modules/search-module/search-module";

const Main: FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm("searchString", "");
  const [searchResults, setSearchResults] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(localStorage.getItem("currentPage")) || 1,
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const detailsRef = useRef<HTMLDivElement>(null);

  const searchQuery = searchParams.get("search") || "";
  const pageQuery =
    Number(searchParams.get("page")) ||
    Number(localStorage.getItem("currentPage")) ||
    1;
  const characterQuery = searchParams.get("character") || "";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toString();
    setSearchTerm(value);
    setSearchParams({ search: value, page: "1" }, { replace: false });
  };

  const handleSearch = async (term: string, page: number) => {
    const trimmedSearchTerm = term.trim();
    localStorage.setItem("searchString", trimmedSearchTerm);
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

  const fetchCharacterDetails = async (character: ICharacter) => {
    setIsLoading(true);
    try {
      const response = await fetch(character.url);
      const data = await response.json();
      setSelectedCharacter(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching character details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(pageQuery);
    if (searchQuery) {
      setSearchTerm(searchQuery);
      handleSearch(searchQuery, pageQuery);
    } else {
      handleSearch(searchTerm, pageQuery);
    }
  }, [searchQuery, pageQuery]);

  useEffect(() => {
    if (characterQuery) {
      const character = searchResults.find(
        (char) => char.name === characterQuery,
      );
      if (character) {
        fetchCharacterDetails(character);
        setErrorMessage(null);
      } else {
        setSelectedCharacter(null);
        setErrorMessage(`Character "${characterQuery}" not found.`);
      }
    }
  }, [characterQuery, searchResults]);

  const handlePageChange = (page: number) => {
    setSearchParams(
      {
        search: searchTerm,
        page: page.toString(),
      },
      { replace: false },
    );
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
    handleSearch(searchTerm, page);
  };

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const handleItemClick = (character: ICharacter) => {
    setSearchParams(
      {
        search: searchTerm,
        page: currentPage.toString(),
        character: character.name,
      },
      { replace: false },
    );
    fetchCharacterDetails(character);
  };

  const handleItemClose = () => {
    setSearchParams(
      { search: searchTerm, page: currentPage.toString() },
      { replace: false },
    );
    setSelectedCharacter(null);
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      detailsRef.current &&
      !detailsRef.current.contains(event.target as Node)
    ) {
      handleItemClose();
    }
  };

  return (
    <div className={styles.mainContainer} onClick={handleContainerClick}>
      <div className={`${selectedCharacter ? styles.blockedInteractions : ""}`}>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <SearchSection
          searchTerm={searchTerm}
          searchResults={searchResults}
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          onSearch={handleSearch}
          onInputChange={handleInputChange}
          onItemClick={handleItemClick}
          onPageChange={handlePageChange}
        />
      </div>
      {selectedCharacter && (
        <DetailsSection
          selectedCharacter={selectedCharacter}
          isDetailLoading={isLoading}
          detailsRef={detailsRef}
          onClose={handleItemClose}
          isOpen={!!selectedCharacter}
        />
      )}
    </div>
  );
};

export default Main;
