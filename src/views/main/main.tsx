import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { fetchCharacters } from "../../API/fetchResults";
import styles from "./main.module.css";
import { Character } from "../../API/apiTypes";
import useSearchTerm from "../../hooks/useSearchTerm";
import { useSearchParams } from "react-router-dom";
import DetailsSection from "../../modules/details-module/details-module";
import SearchSection from "../../modules/search-module/search-module";

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

  const detailsRef = useRef<HTMLDivElement>(null);

  const searchQuery = searchParams.get("search") || "";
  const pageQuery =
    searchParams.get("page") || localStorage.getItem("currentPage");
  const characterQuery = searchParams.get("character") || "";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toString();
    setSearchTerm(value);

    setCurrentPage(1);
    setSearchParams({ search: value, page: "1" }, { replace: false });
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
    if (searchQuery) {
      setSearchTerm(searchQuery);
      handleSearch(searchQuery, page);
    } else {
      handleSearch(searchTerm, page);
    }
  }, [searchQuery, pageQuery]);

  useEffect(() => {
    if (characterQuery) {
      const character = searchResults.find(
        (char) => char.name === characterQuery,
      );
      if (character) fetchCharacterDetails(character);
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
    if (currentPage !== Number(pageQuery)) {
      setSearchParams(
        {
          search: searchTerm,
          page: currentPage.toString(),
        },
        { replace: false },
      );
    }

    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const handleItemClick = (character: Character) => {
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
      {selectedCharacter && (
        <DetailsSection
          selectedCharacter={selectedCharacter}
          isDetailLoading={isDetailLoading}
          detailsRef={detailsRef}
          onClose={handleItemClose}
        />
      )}
    </div>
  );
};

export default Main;
