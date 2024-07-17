import React, { useContext } from "react";
import { ICharacter } from "../../API/apiTypes";
import styles from "./details-component.module.css";
import { ThemeContext } from "../../contexts/themeContext";

interface DetailsProps {
  details: ICharacter;
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ details, onClose }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.detailsContainer} ${darkTheme ? styles.darkThemeDetailsContainer : ""}`}
    >
      <button
        onClick={onClose}
        className={`${styles.closeButton}  ${darkTheme ? styles.darkThemeCloseButton : ""}`}
      >
        Close
      </button>
      <h2 className={styles.detailsHeader}>{details.name}</h2>
      <ul className={styles.characterDetails}>
        <li>
          <strong>Height:</strong> {details.height} cm
        </li>
        <li>
          <strong>Mass:</strong> {details.mass} kg
        </li>
        <li>
          <strong>Hair Color:</strong> {details.hair_color}
        </li>
        <li>
          <strong>Skin Color:</strong> {details.skin_color}
        </li>
        <li>
          <strong>Eye Color:</strong> {details.eye_color}
        </li>
        <li>
          <strong>Birth Year:</strong> {details.birth_year}
        </li>
        <li>
          <strong>Gender:</strong> {details.gender}
        </li>
      </ul>
    </div>
  );
};

export default Details;
