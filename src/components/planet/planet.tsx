import { FC, useContext } from "react";
import { IPlanet } from "../../API/apiTypes";
import styles from "./planet.module.css";
import { ThemeContext } from "../../contexts/themeContext";

interface PlanetSectionProps {
  planet: IPlanet | null;
  isLoading: boolean;
}

const Planet: FC<PlanetSectionProps> = ({ planet, isLoading }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.planetSection} ${darkTheme ? styles.darkThemePlanetSection : ""}`}
    >
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
