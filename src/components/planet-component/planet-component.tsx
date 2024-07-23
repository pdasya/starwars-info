import { FC } from "react";
import { IPlanet } from "../../API/apiTypes";
import styles from "./planet-component.module.css";

interface PlanetSectionProps {
  planet: IPlanet | null;
  isLoading: boolean;
}

const Planet: FC<PlanetSectionProps> = ({ planet, isLoading }) => {
  return (
    <div className={styles.planetSection}>
      <h2 className={styles.planetHeader}>Homeworld</h2>
      {isLoading ? (
        <div>Loading planet...</div>
      ) : planet ? (
        <div>
          <p>{planet.name}</p>
        </div>
      ) : (
        <p>No homeworld information available for this character.</p>
      )}
    </div>
  );
};

export default Planet;
