import { Item } from "@features/selectedItemsSlice";
import { saveAs } from "file-saver";

export const downloadCSV = (items: Item[], filename: string) => {
  const csvContent = [
    ["Name", "Height", "Mass", "Gender"],
    ...items.map((item) => [item.name, item.height, item.mass, item.gender]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
};
