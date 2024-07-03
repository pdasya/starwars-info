import { Component } from "react";
import styles from "./results-component.module.css";
import { Character } from "../../API/fetchResults";

interface ResultsProps {
  results: Character[];
}

class Result extends Component<ResultsProps> {
  render() {
    const { results } = this.props;

    if (!results || results.length === 0) {
      return <div className={styles.resultsWrapper}>No results found.</div>;
    }
    return (
      <div className={styles.resultsWrapper}>
        {results.map((character) => (
          <div className={styles.characterCard} key={character.url}>
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
        ))}
      </div>
    );
  }
}

export default Result;
