"use client";

import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IApiResponse, ICharacter } from "@API/apiTypes";
import DetailsSection from "@modules/details-module/details-module";
import SearchSection from "@modules/search-module/search-module";
import useSearchTerm from "@hooks/useSearchTerm";
import { setCurrentPage } from "@features/currentPageSlice";
import styles from "../../styles/main-page.module.css";
import { AppDispatch, RootState } from "@/store/store";
import "../../App.css";

export interface MainProps {
  initialData: IApiResponse;
  initialSearchQuery: string;
  initialPageQuery: number;
}

const Main: FC<MainProps> = ({
  initialData,
  initialSearchQuery,
  initialPageQuery,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useSearchTerm(
    "searchString",
    initialSearchQuery,
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = useSelector((state: RootState) => state.currentPage);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null,
  );

  const detailsRef = useRef<HTMLDivElement>(null);

  const characterQuery = searchParams
    ? searchParams.get("character") || ""
    : "";

  const [data, setData] = useState<IApiResponse>(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchResults = useMemo(() => data?.results || [], [data]);
  const totalPages = useMemo(() => Math.ceil((data?.count || 0) / 10), [data]);

  useEffect(() => {
    dispatch(setCurrentPage(initialPageQuery));
    if (initialSearchQuery) {
      setSearchTerm(initialSearchQuery);
    }
  }, [initialSearchQuery, initialPageQuery, dispatch, setSearchTerm]);

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

  const handlePageChange = async (page: number) => {
    router.push(`/main?search=${searchTerm}&page=${page}`);
    dispatch(setCurrentPage(page));

    setIsFetching(true);
    try {
      const res = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`,
      );
      const newData = await res.json();
      setData(newData);
      setError(null);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setIsFetching(false);
    }
  };

  const handleItemClick = (character: ICharacter) => {
    router.push(
      `/main?search=${searchTerm}&page=${currentPage.currentPage}&character=${character.name}`,
    );
    setSelectedCharacter(character);
  };

  const handleItemClose = () => {
    router.push(`/main?search=${searchTerm}&page=${currentPage.currentPage}`);
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

  const handleSearch = async () => {
    router.push(`/main?search=${searchTerm}&page=1`);
    dispatch(setCurrentPage(1));

    setIsFetching(true);
    try {
      const res = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}&page=1}`,
      );
      const newData = await res.json();
      setData(newData);
      setError(null);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className={styles.mainContainer} onClick={handleContainerClick}>
      <div className={`${selectedCharacter ? styles.blockedInteractions : ""}`}>
        {error && <div className={styles.error}>{error}</div>}
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
