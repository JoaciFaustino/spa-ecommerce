import { Size } from "@/@types/Cake";
import { MAX_LAYER_OF_FILLINGS } from "@/@types/Filling";
import { useEffect, useState } from "react";

export type SetValuesFillingsFunction = (
  name: "fillings",
  value: string[],
  options?:
    | Partial<{
        shouldValidate: boolean;
        shouldDirty: boolean;
        shouldTouch: boolean;
      }>
    | undefined
) => void;

export const useFillings = (
  fillingsSelecteds: string[],
  sizeSelected: Size,
  setFillings: SetValuesFillingsFunction,
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

    setFillings("fillings", fillingsChangeds);
  };

  const selectHandlerFillingValue = (indexToModify: number) => {
    return (newValue: string) => {
      const newFillings = fillingsSelecteds.map((prevValue, index) =>
        index === indexToModify ? newValue : prevValue
      );

      setFillings("fillings", newFillings);
    };
  };

  const removeLayer = (indexToRemove: number) => {
    const newFillings: string[] = fillingsSelecteds.filter(
      (_, index) => index !== indexToRemove
    );

    setFillings("fillings", newFillings);
  };

  const addLayerFilling = () => {
    if (fillingsSelecteds.length >= maxLayersOfFillings) {
      return;
    }

    const newFillings = [...fillingsSelecteds, selectInitialValue];

    setFillings("fillings", newFillings);
  };

  return {
    selectHandlerFillingValue,
    maxLayersOfFillings,
    addLayerFilling,
    removeLayer
  };
};
