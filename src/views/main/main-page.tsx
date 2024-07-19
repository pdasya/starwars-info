import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ICharacter } from "../../API/apiTypes";
import { useFetchCharactersQuery } from "../../features/apiSlice";
import DetailsSection from "../../modules/details-module/details-module";
import SearchSection from "../../modules/search-module/search-module";
import useSearchTerm from "../../hooks/useSearchTerm";
import styles from "./main-page.module.css";

const Main: FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm("searchString", "");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(localStorage.getItem("currentPage")) || 1,
  );
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

  const { data, error, isLoading, refetch } = useFetchCharactersQuery({
    searchItem: searchTerm,
    page: currentPage,
  });

  const searchResults = data?.results || [];
  const totalPages = Math.ceil((data?.count || 0) / 10);

  useEffect(() => {
    setCurrentPage(pageQuery);
    if (searchQuery) {
      setSearchTerm(searchQuery);
      refetch();
    } else {
      refetch();
    }
  }, [searchQuery, pageQuery, refetch]);

  useEffect(() => {
    if (characterQuery) {
      const character = searchResults.find(
        (char) => char.name === characterQuery,
      );
      if (character) {
        setSelectedCharacter(character);
        setErrorMessage(null);
      } else {
        setSelectedCharacter(null);
        setErrorMessage(`Character "${characterQuery}" not found.`);
      }
    }
  }, [characterQuery, searchResults]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toString();
    setSearchTerm(value);
    setSearchParams({ search: value, page: "1" }, { replace: false });
  };

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
    refetch();
  };

  const handleItemClick = (character: ICharacter) => {
    setSearchParams(
      {
        search: searchTerm,
        page: currentPage.toString(),
        character: character.name,
      },
      { replace: false },
    );
    setSelectedCharacter(character);
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
        {error && <div className={styles.error}>Error fetching data</div>}
        <SearchSection
          searchTerm={searchTerm}
          searchResults={searchResults}
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          onSearch={() => refetch()}
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
