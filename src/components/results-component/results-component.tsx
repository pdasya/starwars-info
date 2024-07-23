import { FC } from "react";
import styles from "./results-component.module.css";
import { ICharacter } from "../../API/apiTypes";
import Card from "../card-component/card-component";

interface ResultsProps {
  results: ICharacter[];
  onItemClick: (character: ICharacter) => void;
}

const Result: FC<ResultsProps> = ({ results, onItemClick }) => {
  if (!results || results.length === 0) {
    return <div className={styles.resultsWrapper}>No results found.</div>;
  }
  return (
    <div className={styles.resultsWrapper}>
      {results.map((character) => (
        <Card
          character={character}
          key={character.url}
          onClick={() => onItemClick(character)}
        />
      ))}
    </div>
  );
};

export default Result;
