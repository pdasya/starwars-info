import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ICharacter } from "../../API/apiTypes";
import { useFetchCharactersQuery } from "../../features/apiSlice";
import DetailsSection from "../../modules/details-module/details-module";
import SearchSection from "../../modules/search-module/search-module";
import useSearchTerm from "../../hooks/useSearchTerm";
import { setCurrentPage } from "../../features/currentPageSlice";
import styles from "./main-page.module.css";
import { AppDispatch, RootState } from "../../app/store";

const Main: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useSearchTerm("searchString", "");
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useSelector((state: RootState) => state.currentPage);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null,
  );

  const detailsRef = useRef<HTMLDivElement>(null);

  const searchQuery = searchParams.get("search") || "";
  const pageQuery = Number(searchParams.get("page")) || 1;
  const characterQuery = searchParams.get("character") || "";

  const { data, error, isFetching } = useFetchCharactersQuery({
    searchItem: searchQuery,
    page: currentPage.currentPage,
  });

  const searchResults = useMemo(() => data?.results || [], [data]);
  const totalPages = useMemo(() => Math.ceil((data?.count || 0) / 10), [data]);

  useEffect(() => {
    dispatch(setCurrentPage(pageQuery));
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery, pageQuery, dispatch, setSearchTerm]);

  useEffect(() => {
    if (characterQuery) {
      const character = searchResults.find(
        (char) => char.name === characterQuery,
      );
      if (character) {
        setSelectedCharacter(character);
      } else {
        setSelectedCharacter(null);
      }
    }
  }, [characterQuery, searchResults]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toString();
    setSearchTerm(value);
  };

  const handlePageChange = (page: number) => {
    setSearchParams(
      {
        search: searchTerm,
        page: page.toString(),
      },
      { replace: false },
    );
    dispatch(setCurrentPage(page));
  };

  const handleItemClick = (character: ICharacter) => {
    setSearchParams(
      {
        search: searchTerm,
        page: currentPage.currentPage.toString(),
        character: character.name,
      },
      { replace: false },
    );
    setSelectedCharacter(character);
  };

  const handleItemClose = () => {
    setSearchParams(
      { search: searchTerm, page: currentPage.currentPage.toString() },
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

  const handleSearch = () => {
    setSearchParams({ search: searchTerm, page: "1" }, { replace: false });
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.mainContainer} onClick={handleContainerClick}>
      <div className={`${selectedCharacter ? styles.blockedInteractions : ""}`}>
        {error && <div className={styles.error}>Error fetching data</div>}
        <SearchSection
          searchTerm={searchTerm}
          searchResults={searchResults}
          currentPage={currentPage.currentPage}
          totalPages={totalPages}
          isLoading={isFetching}
          onSearch={handleSearch}
          onInputChange={handleInputChange}
          onItemClick={handleItemClick}
          onPageChange={handlePageChange}
        />
      </div>
      {selectedCharacter && (
        <DetailsSection
          selectedCharacter={selectedCharacter}
          isDetailLoading={isFetching}
          detailsRef={detailsRef}
          onClose={handleItemClose}
          isOpen={!!selectedCharacter}
        />
      )}
    </div>
  );
};

export default Main;
