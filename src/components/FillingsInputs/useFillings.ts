import { Size } from "@/@types/Cake";
import { MAX_LAYER_OF_FILLINGS } from "@/@types/Filling";
import { useEffect } from "react";

export const useFillings = (
  fillingsSelecteds: string[],
  sizeSelected: Size,
  setFillings: (newFillings: string[]) => void,
  selectInitialValue: string
) => {
  const maxLayersOfFillings: number = MAX_LAYER_OF_FILLINGS[sizeSelected];

  useEffect(() => {
    changeNumberOfFillingsSelecteds();
  }, [maxLayersOfFillings]);

  const changeNumberOfFillingsSelecteds = () => {
    if (fillingsSelecteds.length <= maxLayersOfFillings) {
      return;
    }

    const fillingsChangeds: string[] = [];

    for (let i = 0; i < maxLayersOfFillings; i++) {
      fillingsChangeds.push(fillingsSelecteds[i]);
    }

    setFillings(fillingsChangeds);
  };

  const selectHandlerFillingValue = (indexToModify: number) => {
    return (newValue: string | undefined) => {
      if (!newValue) {
        return;
      }

      const newFillings = fillingsSelecteds.map((prevValue, index) =>
        index === indexToModify ? newValue : prevValue
      );

      setFillings(newFillings);
    };
  };

  const removeLayer = (indexToRemove: number) => {
    const newFillings: string[] = fillingsSelecteds.filter(
      (_, index) => index !== indexToRemove
    );

    setFillings(newFillings);
  };

  const addLayerFilling = () => {
    if (fillingsSelecteds.length >= maxLayersOfFillings) {
      return;
    }

    const newFillings = [...fillingsSelecteds, selectInitialValue];

    setFillings(newFillings);
  };

  return {
    selectHandlerFillingValue,
    maxLayersOfFillings,
    addLayerFilling,
    removeLayer
  };
};
