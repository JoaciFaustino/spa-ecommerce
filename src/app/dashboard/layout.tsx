"use server";
import styles from "@/styles/pages/Dashboard.module.scss";
import Nav from "./_components/Nav/Nav";
import CakePartsProvider from "@/contexts/CakePartsProvider";

import {
  getCakeTypesWithErrorHandling,
  getCategoriesWithErrorHandling,
  getFillingsWithErrorHandling,
  getFrostingsWithErrorHandling
} from "@/utils/getCakePartsValues";

const page = 1;
const limit = 12;

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  try {
    const [cakeTypes, categories, fillings, frostings] = await Promise.all([
      getCakeTypesWithErrorHandling(limit, page),
      getCategoriesWithErrorHandling(limit, page),
      getFillingsWithErrorHandling(limit, page),
      getFrostingsWithErrorHandling(limit, page)
    ]);

    const cakeTypesStrings = cakeTypes.map(({ type }) => type);
    const categoriesStrings = categories.map(({ category }) => category);
    const fillingsStrings = fillings.map(({ name }) => name);
    const frostingsStrings = frostings.map(({ name }) => name);

    return (
      <section className={styles.mainSection}>
        <div className={`${styles.wrapper} wrapper`}>
          <Nav />

          <CakePartsProvider
            firstCakeTypes={cakeTypesStrings}
            firstCategories={categoriesStrings}
            firstFillings={fillingsStrings}
            firstFrostings={frostingsStrings}
          >
            {children}
          </CakePartsProvider>
        </div>
      </section>
    );
  } catch (error) {
    return (
      <section className={styles.mainSection}>
        <div className={`${styles.wrapper} wrapper`}>
          <Nav />

          <CakePartsProvider>{children}</CakePartsProvider>
        </div>
      </section>
    );
  }
}

export default DashboardLayout;
