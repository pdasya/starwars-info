import { Component } from "react";
import { Character } from "../../API/fetchResults";
import styles from "./card-component.module.css";

interface CardProps {
  character: Character;
}

class Card extends Component<CardProps> {
  render() {
    const { character } = this.props;

    return (
      <div className={styles.characterCard} key={character.url}>
        <div className={styles.characterCardContent}>
          <h2 className={styles.characterName}>
            {character.name.toLowerCase()}
          </h2>
          <ul className={styles.characterDetails}>
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
        <div className={styles.characterCardOverlay}>
          May the Force be with you
        </div>
      </div>
    );
  }
}

export default Card;
