import styles from "@/styles/pages/Dashboard.module.scss";
import ScrollTop from "@/components/ScrollTop/ScrollTop";
import { Suspense } from "react";
import CakePartsCardSkeleton from "@/components/CakePartsCards/loading";
import LoadInitialFrostings from "./components/LoadInitialFrostings/LoadInitialFrostings";
import SearchAndCreateFrostingBar from "./components/SearchAndCreateFrostingBar/SearchAndCreateFrostingBar";
import Note from "../_components/Note/Note";

type Props = {
  searchParams: { search?: string };
};

async function DashboardFrostings({ searchParams }: Props) {
  const key = JSON.stringify(searchParams);

  return (
    <section className={styles.parentPage}>
      <Note>
        Ao apagar uma cobertura, você vai apagá-la também de todos os bolos que
        a possuem!
      </Note>

      <SearchAndCreateFrostingBar />

      <div className={styles.cakePartsList}>
        <Suspense key={key} fallback={<ListSkeleton />}>
          <LoadInitialFrostings searchParams={searchParams} />
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

export default DashboardFrostings;
