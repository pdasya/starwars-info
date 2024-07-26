import { useEffect, useState } from "react";

const useSearchTerm = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(key);
      return savedValue !== null ? savedValue : initialValue;
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export default useSearchTerm;
