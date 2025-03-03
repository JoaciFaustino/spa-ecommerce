import ScrollTop from "@/components/ScrollTop/ScrollTop";
import styles from "@/styles/pages/Dashboard.module.scss";
import { Suspense } from "react";
import CakePartsCardSkeleton from "@/components/CakePartsCards/loading";
import LoadInitialFillings from "./components/LoadInitialFillings/LoadInitialFillings";
import SearchAndCreateFillingBar from "./components/SearchAndCreateFillingBar/SearchAndCreateFillingBar";
import Note from "../_components/Note/Note";

type Props = {
  searchParams: { search?: string };
};

async function DashboardFillings({ searchParams }: Props) {
  const key = JSON.stringify(searchParams);

  return (
    <section className={styles.parentPage}>
      <Note>
        Ao apagar um recheio, você vai apagá-lo também de todos os bolos que o
        possuem!
      </Note>

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
