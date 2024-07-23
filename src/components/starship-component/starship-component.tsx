import { FC } from "react";
import { IStarship } from "../../API/apiTypes";
import styles from "./starship-component.module.css";

interface StarshipsSectionProps {
  starships: IStarship[];
  isLoading: boolean;
}

const Starships: FC<StarshipsSectionProps> = ({ starships, isLoading }) => {
  return (
    <div className={styles.starshipsSection}>
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
