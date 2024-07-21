import { FC, RefObject, useContext } from "react";
import { ICharacter } from "../../API/apiTypes";
import Details from "../../components/details/details";
import styles from "./details-module.module.css";
import Starships from "../../components/starship/starship";
import Vehicles from "../../components/vehicles/vehicles";
import Planet from "../../components/planet/planet";
import { ThemeContext } from "../../contexts/themeContext";
import {
  useFetchPlanetQuery,
  useFetchStarshipsQuery,
  useFetchVehiclesQuery,
} from "../../features/apiSlice";

interface DetailsSectionProps {
  selectedCharacter: ICharacter | null;
  isDetailLoading: boolean;
  detailsRef: RefObject<HTMLDivElement>;
  onClose: () => void;
  isOpen: boolean;
}

const DetailsSection: FC<DetailsSectionProps> = ({
  selectedCharacter,
  isDetailLoading,
  detailsRef,
  onClose,
  isOpen,
}) => {
  const { darkTheme } = useContext(ThemeContext);

  const { data: starships, isLoading: starshipsLoading } =
    useFetchStarshipsQuery(
      selectedCharacter ? selectedCharacter.starships : [],
      { skip: !selectedCharacter || selectedCharacter.starships.length === 0 },
    );

  const { data: vehicles, isLoading: vehiclesLoading } = useFetchVehiclesQuery(
    selectedCharacter ? selectedCharacter.vehicles : [],
    { skip: !selectedCharacter || selectedCharacter.vehicles.length === 0 },
  );

  const { data: planet, isLoading: planetLoading } = useFetchPlanetQuery(
    selectedCharacter?.homeworld ?? "",
    { skip: !selectedCharacter || !selectedCharacter.homeworld },
  );

  return (
    <div
      className={`${styles.detailsSection} ${isOpen ? styles.open : ""}`}
      ref={detailsRef}
    >
      {isDetailLoading ? (
        <div className={styles.overlay}>
          <span className={styles.loader}>
            <span className={styles.loaderInner}></span>
          </span>
        </div>
      ) : (
        selectedCharacter && (
          <div className={darkTheme ? styles.darkThemeDetailsWrapper : ""}>
            <Details details={selectedCharacter} onClose={onClose} />
            <Starships
              starships={starships || []}
              isLoading={starshipsLoading}
            />
            <Vehicles vehicles={vehicles || []} isLoading={vehiclesLoading} />
            <Planet planet={planet || null} isLoading={planetLoading} />
          </div>
        )
      )}
    </div>
  );
};

export default DetailsSection;
