import { FC, RefObject, useContext, useEffect, useState } from "react";
import { ICharacter, IPlanet, IStarship, IVehicle } from "../../API/apiTypes";
import Details from "../../components/details-component/details-component";
import styles from "./details-module.module.css";
import {
  fetchStarships,
  fetchVehicles,
  fetchPlanet,
} from "../../API/fetchResults";
import Starships from "../../components/starship-component/starship-component";
import Vehicles from "../../components/vehicles-component/vehicles-component";
import Planet from "../../components/planet-component/planet-component";
import { ThemeContext } from "../../contexts/themeContext";

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
  const [starships, setStarships] = useState<IStarship[]>([]);
  const [starshipsLoading, setStarshipsLoading] = useState<boolean>(false);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [vehiclesLoading, setVehiclesLoading] = useState<boolean>(false);
  const [planet, setPlanet] = useState<IPlanet | null>(null);
  const [planetLoading, setPlanetLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllData = async () => {
      if (selectedCharacter) {
        if (selectedCharacter.starships.length > 0) {
          setStarshipsLoading(true);
          try {
            const starshipResults = await fetchStarships(
              selectedCharacter.starships,
            );
            setStarships(starshipResults);
          } catch (error) {
            console.error("Error fetching starships:", error);
          } finally {
            setStarshipsLoading(false);
          }
        }

        if (selectedCharacter.vehicles.length > 0) {
          setVehiclesLoading(true);
          try {
            const vehicleResults = await fetchVehicles(
              selectedCharacter.vehicles,
            );
            setVehicles(vehicleResults);
          } catch (error) {
            console.error("Error fetching vehicles:", error);
          } finally {
            setVehiclesLoading(false);
          }
        }

        if (selectedCharacter.homeworld) {
          setPlanetLoading(true);
          try {
            const planetData = await fetchPlanet(selectedCharacter.homeworld);
            setPlanet(planetData);
          } catch (error) {
            console.error("Error fetching planet:", error);
          } finally {
            setPlanetLoading(false);
          }
        }
      }
    };

    fetchAllData();
  }, [selectedCharacter]);

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
            <Starships starships={starships} isLoading={starshipsLoading} />
            <Vehicles vehicles={vehicles} isLoading={vehiclesLoading} />
            <Planet planet={planet} isLoading={planetLoading} />
          </div>
        )
      )}
    </div>
  );
};

export default DetailsSection;
