"use client";
import { ICakeType } from "@/@types/CakeType";
import { ICategory } from "@/@types/Category";
import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type CakePartsContext = {
  cakeTypes: string[];
  categories: string[];
  fillings: string[];
  frostings: string[];
  setCakeTypes: Dispatch<SetStateAction<string[]>>;
  setCategories: Dispatch<SetStateAction<string[]>>;
  setFillings: Dispatch<SetStateAction<string[]>>;
  setFrostings: Dispatch<SetStateAction<string[]>>;

  cakeTypesPage: number;
  categoriesPage: number;
  fillingsPage: number;
  frostingsPage: number;
  setCakeTypesPage: Dispatch<SetStateAction<number>>;
  setCategoriesPage: Dispatch<SetStateAction<number>>;
  setFillingsPage: Dispatch<SetStateAction<number>>;
  setFrostingsPage: Dispatch<SetStateAction<number>>;
};

export const CakePartsContext = createContext({} as CakePartsContext);

type CakePartsProviderProps = {
  children: React.ReactNode;

  firstCakeTypes?: ICakeType[];
  firstCategories?: ICategory[];
  firstFillings?: IFilling[];
  firstFrostings?: IFrosting[];
};

function CakePartsProvider({
  children,
  firstCakeTypes = [],
  firstCategories = [],
  firstFillings = [],
  firstFrostings = []
}: CakePartsProviderProps) {
  const [cakeTypes, setCakeTypes] = useState<string[]>(
    firstCakeTypes.map(({ type }) => type)
  );
  const [categories, setCategories] = useState<string[]>(
    firstCategories.map(({ category }) => category)
  );
  const [fillings, setFillings] = useState<string[]>(
    firstFillings.map(({ name }) => name)
  );
  const [frostings, setFrostings] = useState<string[]>(
    firstFrostings.map(({ name }) => name)
  );

  const [cakeTypesPage, setCakeTypesPage] = useState(2);
  const [categoriesPage, setCategoriesPage] = useState(2);
  const [fillingsPage, setFillingsPage] = useState(2);
  const [frostingsPage, setFrostingsPage] = useState(2);

  return (
    <CakePartsContext.Provider
      value={{
        cakeTypes,
        categories,
        fillings,
        frostings,
        setCakeTypes,
        setCategories,
        setFillings,
        setFrostings,
        cakeTypesPage,
        categoriesPage,
        fillingsPage,
        frostingsPage,
        setCakeTypesPage,
        setCategoriesPage,
        setFillingsPage,
        setFrostingsPage
      }}
    >
      {children}
    </CakePartsContext.Provider>
  );
}

export default CakePartsProvider;
