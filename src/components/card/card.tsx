import { FC, useContext } from "react";
import { ICharacter } from "@API/apiTypes";
import styles from "./card.module.css";
import { ThemeContext } from "@contexts/themeContext";
import Checkbox from "../checkbox/checkbox";

interface CardProps {
  character: ICharacter;
  onClick: () => void;
}

const Card: FC<CardProps> = ({ character, onClick }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.characterCard} ${darkTheme ? styles.darkThemeСharacterCard : ""}`}
      key={character.url}
      onClick={onClick}
    >
      <div className={styles.characterCardContent}>
        <h2
          className={`${styles.characterName} ${darkTheme ? styles.darkThemeCharacterName : ""}`}
        >
          {character.name.toLowerCase()}
        </h2>
        <ul
          className={`${styles.characterDetails} ${darkTheme ? styles.darkThemeCharacterDetails : ""}`}
        >
          <li>
            <strong>Height:</strong> {character.height} cm
          </li>
          <li>
            <strong>Mass:</strong> {character.mass} kg
          </li>
          <li>
            <strong>Hair Color:</strong> {character.hair_color}
          </li>
          <li>
            <strong>Skin Color:</strong> {character.skin_color}
          </li>
          <li>
            <strong>Eye Color:</strong> {character.eye_color}
          </li>
          <li>
            <strong>Birth Year:</strong> {character.birth_year}
          </li>
          <li>
            <strong>Gender:</strong> {character.gender}
          </li>
        </ul>
      </div>
      <Checkbox character={character} />
    </div>
  );
};

export default Card;
