import { ChangeEvent, FC } from "react";
import { ICharacter } from "@API/apiTypes";
import Search from "@components/search/search";
import Result from "@components/card-list/card-list";
import Pagination from "@components/pagination/pagination";
import styles from "./search-module.module.css";

interface SearchSectionProps {
  searchTerm: string;
  searchResults: ICharacter[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onSearch: () => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onItemClick: (character: ICharacter) => void;
  onPageChange: (page: number) => void;
}

const SearchSection: FC<SearchSectionProps> = ({
  searchTerm,
  searchResults,
  currentPage,
  totalPages,
  isLoading,
  onSearch,
  onInputChange,
  onItemClick,
  onPageChange,
}) => {
  return (
    <div className={styles.searchResults}>
      <Search
        searchTerm={searchTerm}
        onInputChange={onInputChange}
        onSearch={onSearch}
      />
      {isLoading ? (
        <div className={styles.overlay}>
          <span className={styles.loader}>
            <span className={styles.loaderInner}></span>
          </span>
        </div>
      ) : (
        <>
          <Result results={searchResults} onItemClick={onItemClick} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default SearchSection;
