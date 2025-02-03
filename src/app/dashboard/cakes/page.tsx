import SearchAndCreateBar from "./components/SearchAndCreateBar/SearchAndCreateBar";
import styles from "@/styles/pages/Dashboard.module.scss";
import LoadInitialCakes from "./components/LoadInitialCakes/LoadInitialCakes";
import { Suspense } from "react";
import ScrollTop from "@/components/ScrollTop/ScrollTop";
import AdminCakeCardLoading from "@/components/AdminCakeCard/loading";

type Props = {
  searchParams: { search?: string };
};

async function DashboardCakesPage({ searchParams }: Props) {
  const key = JSON.stringify(searchParams);

  return (
    <section className={styles.parentPage}>
      <SearchAndCreateBar />

      <div className={styles.cakesList}>
        <Suspense key={key} fallback={<ListSkeleton />}>
          <LoadInitialCakes searchParams={searchParams} />
        </Suspense>
      </div>

      <ScrollTop />
    </section>
  );
}

function ListSkeleton() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <AdminCakeCardLoading key={index} />
      ))}
    </>
  );
}

export default DashboardCakesPage;
