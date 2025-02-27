"use server";
import styles from "@/styles/pages/Dashboard.module.scss";
import CakePartsProvider from "@/contexts/CakePartsProvider";

import {
  getCakeTypesWithErrorHandling,
  getCategoriesWithErrorHandling,
  getFillingsWithErrorHandling,
  getFrostingsWithErrorHandling
} from "@/utils/getCakePartsValues";

const page = 1;
const limit = 24;

async function DashboardCakesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [cakeTypes, categories, fillings, frostings] = await Promise.all([
    getCakeTypesWithErrorHandling(limit, page),
    getCategoriesWithErrorHandling(limit, page),
    getFillingsWithErrorHandling(limit, page),
    getFrostingsWithErrorHandling(limit, page)
  ]);

  return (
    <CakePartsProvider
      firstCakeTypes={cakeTypes}
      firstCategories={categories}
      firstFillings={fillings}
      firstFrostings={frostings}
    >
      {children}
    </CakePartsProvider>
  );
}

export default DashboardCakesLayout;
