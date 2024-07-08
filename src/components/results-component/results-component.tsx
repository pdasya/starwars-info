import { FC } from "react";
import styles from "./results-component.module.css";
import { Character } from "../../API/apiTypes";
import Card from "../card-component/card-component";

interface ResultsProps {
  results: Character[];
}

const Result: FC<ResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <div className={styles.resultsWrapper}>No results found.</div>;
  }
  return (
    <div className={styles.resultsWrapper}>
      {results.map((character) => (
        <Card character={character} key={character.url} />
      ))}
    </div>
  );
};

export default Result;
