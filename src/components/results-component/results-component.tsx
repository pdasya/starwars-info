import { Component } from "react";
import styles from "./results-component.module.css";
import { Character } from "../../API/fetchResults";
import Card from "../card-component/card-component";

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
          <Card character={character} key={character.url} />
        ))}
      </div>
    );
  }
}

export default Result;
