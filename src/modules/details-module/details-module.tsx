import { FC, RefObject } from "react";
import { Character } from "../../API/apiTypes";
import Details from "../../components/details-component/details-component";
import styles from "./details-module.module.css";

interface DetailsSectionProps {
  selectedCharacter: Character | null;
  isDetailLoading: boolean;
  detailsRef: RefObject<HTMLDivElement>;
  onClose: () => void;
}

const DetailsSection: FC<DetailsSectionProps> = ({
  selectedCharacter,
  isDetailLoading,
  detailsRef,
  onClose,
}) => {
  return (
    <div className={styles.detailsSection} ref={detailsRef}>
      {isDetailLoading ? (
        <div className={styles.overlay}>
          <span className={styles.loader}>
            <span className={styles.loaderInner}></span>
          </span>
        </div>
      ) : (
        selectedCharacter && (
          <Details details={selectedCharacter} onClose={onClose} />
        )
      )}
    </div>
  );
};

export default DetailsSection;
