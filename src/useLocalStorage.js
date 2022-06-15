import { useEffect, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const isLocalStorageAvailable = typeof localStorage !== "undefined";
  const [item, setItem] = useState(() => {
    if (!isLocalStorageAvailable) {
      return defaultValue;
    }
    const savedItem = localStorage.getItem(key);
    if (savedItem !== null) {
      try {
        return JSON.parse(savedItem);
      } catch (e) {
        console.error(e);
        return defaultValue;
      }
    }
    return defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(item));
  }, [key, item]);
  return [item, setItem];
};
