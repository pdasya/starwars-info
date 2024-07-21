import { FC, useContext } from "react";
import { IStarship } from "../../../API/apiTypes";
import styles from "./starship.module.css";
import { ThemeContext } from "../../../contexts/themeContext";

interface StarshipsSectionProps {
  starships: IStarship[];
  isLoading: boolean;
}

const Starships: FC<StarshipsSectionProps> = ({ starships, isLoading }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.starshipsSection} ${darkTheme ? styles.darkThemeStarshipsSection : ""}`}
    >
      <h2 className={styles.starshipsHeader}>Starships</h2>
      {isLoading ? (
        <div>Loading starships...</div>
      ) : starships.length > 0 ? (
        <ul className={styles.starshipsItem}>
          {starships.map((starship) => (
            <li key={starship.url}>
              <p>{starship.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No starships available for this character.</p>
      )}
    </div>
  );
};

export default Starships;
