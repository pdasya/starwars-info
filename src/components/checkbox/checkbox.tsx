import { FC, useContext } from "react";
import styles from "./checkbox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectItem, unselectItem, Item } from "@features/selectedItemsSlice";
import { ICharacter } from "@API/apiTypes";
import { ThemeContext } from "@contexts/themeContext";

interface CheckboxProps {
  character: ICharacter;
}

const Checkbox: FC<CheckboxProps> = ({ character }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: { selectedItems: { selectedItems: Item[] } }) =>
      state.selectedItems.selectedItems,
  );
  const { darkTheme } = useContext(ThemeContext);

  const handleCheckboxChange = () => {
    const item: Item = {
      id: character.url,
      name: character.name,
      height: character.height,
      mass: character.mass,
      gender: character.gender,
    };
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      dispatch(unselectItem(item.id));
    } else {
      dispatch(selectItem(item));
    }
  };

  return (
    <div
      className={`${styles.checkboxWrapper} ${darkTheme ? styles.darkThemeCheckboxWrapper : ""}`}
    >
      <input
        type="checkbox"
        checked={selectedItems.some(
          (selectedItem) => selectedItem.id === character.url,
        )}
        onChange={handleCheckboxChange}
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      />
      <svg viewBox="0 0 35.6 35.6">
        <circle
          className={styles.background}
          cx="17.8"
          cy="17.8"
          r="17.8"
        ></circle>
        <circle
          className={styles.stroke}
          cx="17.8"
          cy="17.8"
          r="14.37"
        ></circle>
        <polyline
          className={styles.check}
          points="11.78 18.12 15.55 22.23 25.17 12.87"
        ></polyline>
      </svg>
    </div>
  );
};

export default Checkbox;
