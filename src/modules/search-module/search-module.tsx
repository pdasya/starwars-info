import { ChangeEvent, FC } from "react";
import { ICharacter } from "../../API/apiTypes";
import Search from "../../components/search-component/search-component";
import Result from "../../components/card-list-component/card-list-component";
import Pagination from "../../components/pagination-component/pagination-component";
import styles from "./search-module.module.css";

interface SearchSectionProps {
  searchTerm: string;
  searchResults: ICharacter[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onSearch: (term: string, page: number) => void;
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
        onSearch={() => onSearch(searchTerm, 1)}
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
