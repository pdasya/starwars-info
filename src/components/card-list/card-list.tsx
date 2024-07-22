import { FC } from "react";
import styles from "./card-list.module.css";
import { ICharacter } from "@API/apiTypes";
import Card from "../card/card";
import Flyout from "../flyout/flyout";

interface CardListProps {
  results: ICharacter[];
  onItemClick: (character: ICharacter) => void;
}

const CardList: FC<CardListProps> = ({ results, onItemClick }) => {
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
      <Flyout />
    </div>
  );
};

export default CardList;
