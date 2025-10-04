import { useState, useEffect } from "react";
import {
  LOCAL_STORAGE_KEY,
  DEFAULT_PLATE,
  MIN_PLATES,
  MAX_PLATES,
} from "../constants";

const getInitialState = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const plates = JSON.parse(stored);
      if (Array.isArray(plates) && plates.length > 0) return plates;
    }
  } catch (error) {
    console.error("Failed to load plates:", error);
  }
  return [{ id: Date.now(), ...DEFAULT_PLATE }];
};

export const usePlates = () => {
  const [plates, setPlates] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(plates));
  }, [plates]);

  const addPlate = () => {
    if (plates.length < MAX_PLATES) {
      setPlates((prev) => [...prev, { id: Date.now(), ...DEFAULT_PLATE }]);
    }
  };

  const removePlate = (id) => {
    if (plates.length > MIN_PLATES) {
      setPlates((prev) => prev.filter((plate) => plate.id !== id));
    }
  };

  const updatePlate = (id, updates) => {
    setPlates((prev) =>
      prev.map((plate) => (plate.id === id ? { ...plate, ...updates } : plate))
    );
  };

  return { plates, addPlate, removePlate, updatePlate };
};
