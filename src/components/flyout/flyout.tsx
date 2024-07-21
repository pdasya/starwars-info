import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item, unselectAllItems } from "../../features/selectedItemsSlice";
import styles from "./flyout.module.css";
import { downloadCSV } from "../../utils/downloadCsv";

const Flyout: FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: { selectedItems: { selectedItems: Item[] } }) =>
      state.selectedItems.selectedItems,
  );

  if (selectedItems.length === 0) {
    return null;
  }

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  const handleDownload = () => {
    const filename = `${selectedItems.length}_characters.csv`;
    downloadCSV(selectedItems, filename);
  };

  return (
    <div className={styles.flyout}>
      <span>{`${selectedItems.length === 1 ? `${selectedItems.length} item is selected` : `${selectedItems.length} items are selected`}`}</span>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
