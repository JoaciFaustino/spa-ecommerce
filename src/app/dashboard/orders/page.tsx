import { Suspense } from "react";
import styles from "@/styles/pages/Dashboard.module.scss";
import ScrollTop from "@/components/ScrollTop/ScrollTop";
import FiltersBar from "./components/FiltersBar/FiltersBar";
import { OrdersSortByTranslate } from "@/@types/OrdersFilters";
import { redirect } from "next/navigation";
import OrderCardSkeleton from "@/components/OrderCards/loading";
import LoadInitialOrders from "./components/LoadInitialOrders/LoadInitialOrders";

type Props = {
  searchParams: {
    filters?: string | string[];
    sortBy?: string | string[];
    search?: string | string[];
  };
};

async function DashboardOrders({ searchParams }: Props) {
  const defaultSortBy: OrdersSortByTranslate = "mais novos";

  if (!searchParams.sortBy) {
    redirect(`/dashboard/orders/?sortBy=${encodeURIComponent(defaultSortBy)}`);
  }

  const key = JSON.stringify(searchParams);

  return (
    <section className={styles.parentPage}>
      <FiltersBar />

      <div className={styles.list}>
        <Suspense key={key} fallback={<ListSkeleton />}>
          <LoadInitialOrders {...searchParams} />
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
        <OrderCardSkeleton key={index} type="admin" />
      ))}
    </>
  );
}

export default DashboardOrders;
