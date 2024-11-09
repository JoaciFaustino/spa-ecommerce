"use server";
import FiltersBar from "@/app/menu/components/FiltersBar/FiltersBar";
import styles from "../../styles/pages/Menu.module.scss";
import { Suspense } from "react";
import FiltersBarSkeleton from "@/app/menu/components/FiltersBar/loading";
import { CakeQueryParams } from "@/@types/QueryParams";
import CakeCardSkeleton from "@/components/CakeCard/loading";
import { redirect } from "next/navigation";
import LoadInitialCakes from "./components/LoadInitialCakes/LoadInitialCakes";
import ScrollTop from "@/components/ScrollTop/ScrollTop";

async function Menu({ searchParams }: { searchParams: CakeQueryParams }) {
  if (!searchParams.sortBy) {
    return redirect("/menu?sortBy=popularidade");
  }

  const key = JSON.stringify(searchParams);

  return (
    <section className={styles.menu}>
      <Suspense fallback={<FiltersBarSkeleton />}>
        <FiltersBar />
      </Suspense>

      <div className={styles.menuCakes}>
        <div className={`${styles.wrapper} wrapper grid`}>
          <Suspense key={key} fallback={<CakeSkeletons />}>
            <LoadInitialCakes searchParams={searchParams} />
          </Suspense>
        </div>
      </div>

      <ScrollTop />
    </section>
  );
}

function CakeSkeletons() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <CakeCardSkeleton key={index} />
      ))}
    </>
  );
}

export default Menu;
