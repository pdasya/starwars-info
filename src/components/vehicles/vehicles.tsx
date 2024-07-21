import { FC, useContext } from "react";
import { IVehicle } from "@API/apiTypes";
import styles from "./vehicles.module.css";
import { ThemeContext } from "@contexts/themeContext";

interface VehiclesSectionProps {
  vehicles: IVehicle[];
  isLoading: boolean;
}

const Vehicles: FC<VehiclesSectionProps> = ({ vehicles, isLoading }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.vehiclesSection} ${darkTheme ? styles.darkThemeVehiclesSection : ""}`}
    >
      <h2 className={styles.vehicleHeader}>Vehicles</h2>
      {isLoading ? (
        <div>Loading vehicles...</div>
      ) : vehicles.length > 0 ? (
        <ul className={styles.vehicleItem}>
          {vehicles.map((vehicle) => (
            <li key={vehicle.url}>
              <p>{vehicle.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vehicles available for this character.</p>
      )}
    </div>
  );
};

export default Vehicles;
