import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import { formatPriceNumber } from "@/utils/formatPrice";
import { useEffect, useState } from "react";

const calculateTotalPrice = (
  pricingWithoutFillingAndFrosting: number,
  fillingSelecteds: IFilling[],
  frostingSelected: IFrosting | undefined,
  quantity: number
): number => {
  const totalPriceFrosting: number = frostingSelected?.price || 0;

  const totalPriceFillings: number = fillingSelecteds.reduce(
    (acm: number, fillingSelected) => acm + fillingSelected.price,
    0
  );

  //prettier-ignore
  return quantity * (
    pricingWithoutFillingAndFrosting + totalPriceFrosting + totalPriceFillings
  );
};

export const useCalculatePricing = (
  pricingWithoutFillingAndFrosting: number,
  fillingSelecteds: IFilling[],
  frostingSelected: IFrosting | undefined,
  quantity: number
) => {
  const [totalPriceString, setTotalPriceString] = useState("R$ --,--");

  const totalPriceNumber = calculateTotalPrice(
    pricingWithoutFillingAndFrosting,
    fillingSelecteds,
    frostingSelected,
    quantity
  );

  useEffect(() => {
    const totalPriceString =
      totalPriceNumber <= 0 || Number.isNaN(totalPriceNumber)
        ? "R$ --,--"
        : formatPriceNumber(totalPriceNumber);

    setTotalPriceString(totalPriceString);
  }, [totalPriceNumber]);

  return { totalPriceString, totalPriceNumber };
};
