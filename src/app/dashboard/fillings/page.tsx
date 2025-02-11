import ScrollTop from "@/components/ScrollTop/ScrollTop";
import styles from "@/styles/pages/Dashboard.module.scss";
import { Suspense } from "react";
import CakePartsCardSkeleton from "@/components/CakePartsCards/loading";
import LoadInitialFillings from "./components/LoadInitialFillings/LoadInitialFillings";
import SearchAndCreateFillingBar from "./components/SearchAndCreateFillingBar/SearchAndCreateFillingBar";

type Props = {
  searchParams: { search?: string };
};

async function DashboardFillings({ searchParams }: Props) {
  const key = JSON.stringify(searchParams);

  return (
    <section className={styles.parentPage}>
      <SearchAndCreateFillingBar />

      <div className={styles.cakePartsList}>
        <Suspense key={key} fallback={<ListSkeleton />}>
          <LoadInitialFillings searchParams={searchParams} />
        </Suspense>
      </div>

      <ScrollTop />
    </section>
  );
}

const ListSkeleton = () => (
  <>
    {Array.from({ length: 12 }).map((_, index) => (
      <CakePartsCardSkeleton key={index} />
    ))}
  </>
);

export default DashboardFillings;
