"use server";
import FiltersBar from "@/app/menu/components/FiltersBar/FiltersBar";
import styles from "../../styles/pages/Menu.module.scss";
import { Suspense } from "react";
import FiltersBarSkeleton from "@/app/menu/components/FiltersBar/loading";
import { CakeQueryParams } from "@/@types/QueryParams";
import { getAllCakes } from "@/services/requests";
import { sortByApiOptions } from "@/@types/SortBy";
import CakeCard from "@/components/CakeCard/CakeCard";
import { formatPriceNumber } from "@/utils/formatPrice";
import LoadNextCakes from "./components/LoadNextCakes/LoadNextCakes";
import CakeCardSkeleton from "@/components/CakeCard/loading";

const SORT_BY_API_OPTIONS: sortByApiOptions = {
  popularidade: "popularity",
  novos: "latest",
  "preço: do maior para o menor": "price_high_to_low",
  "preço: do menor para o maior": "price_low_to_high"
};

async function Menu({ searchParams }: { searchParams: CakeQueryParams }) {
  const key = JSON.stringify(searchParams);
  const cardSkeletons = Array.from({ length: 12 }).map((_, index) => (
    <CakeCardSkeleton key={index} />
  ));

  return (
    <section className={styles.menu}>
      <Suspense fallback={<FiltersBarSkeleton />}>
        <FiltersBar />
      </Suspense>

      <div className={styles.menuCakes}>
        <div className={`${styles.wrapper} wrapper grid`}>
          <Suspense key={key} fallback={<>{cardSkeletons}</>}>
            <LoadInitialCakes searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function LoadInitialCakes({
  searchParams
}: {
  searchParams: CakeQueryParams;
}) {
  const { sortBy } = searchParams;

  const sortByLastValue: string = Array.isArray(sortBy)
    ? sortBy[sortBy.length - 1] || ""
    : sortBy || "";

  const response = await getAllCakes({
    ...searchParams,
    sortBy: SORT_BY_API_OPTIONS[sortByLastValue] ?? undefined
  });

  const { sucess } = response;

  if (!sucess && response.status === 404) {
    return <h5>Nenhum resultado encontrado!</h5>;
  }

  if (!sucess) {
    return (
      <h5 className={styles.serverErrorText}>
        Ocorreu um erro no servidor! por favor tente novamente mais tarde
      </h5>
    );
  }

  const { cakes, nextUrl } = response;

  return (
    <>
      {cakes.map((cake) => (
        <CakeCard
          key={cake._id}
          nameCake={cake.name}
          typeCake={cake.type}
          imageCake={cake.imageUrl}
          priceCake={formatPriceNumber(cake.totalPricing)}
        />
      ))}
      <LoadNextCakes nextUrl={nextUrl || undefined} />
    </>
  );
}

export default Menu;
