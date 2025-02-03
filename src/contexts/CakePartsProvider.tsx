"use client";
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

  firstCakeTypes?: string[];
  firstCategories?: string[];
  firstFillings?: string[];
  firstFrostings?: string[];
};

function CakePartsProvider({
  children,
  firstCakeTypes = [],
  firstCategories = [],
  firstFillings = [],
  firstFrostings = []
}: CakePartsProviderProps) {
  const [cakeTypes, setCakeTypes] = useState<string[]>(firstCakeTypes);
  const [categories, setCategories] = useState<string[]>(firstCategories);
  const [fillings, setFillings] = useState<string[]>(firstFillings);
  const [frostings, setFrostings] = useState<string[]>(firstFrostings);

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
