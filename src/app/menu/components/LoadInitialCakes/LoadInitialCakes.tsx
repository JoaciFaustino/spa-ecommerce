"use server";
import { formatPriceNumber } from "@/utils/formatPrice";
import LoadNextCakes from "../LoadNextCakes/LoadNextCakes";
import CakeCard from "@/components/CakeCard/CakeCard";
import { CakeQueryParams } from "@/@types/QueryParams";
import { sortByApiOptions } from "@/@types/SortBy";
import { getAllCakes, getFirstPageCakesCached } from "@/services/cakes";
import styles from "./LoadInitialCakes.module.scss";
import { CustomError } from "@/utils/customError";
import { ICake } from "@/@types/Cake";
import RefreshPageButton from "@/components/RefreshPageButton/RefreshPageButton";

const SORT_BY_API_OPTIONS: sortByApiOptions = {
  popularidade: "popularity",
  novos: "latest",
  "preço: do maior para o menor": "price_high_to_low",
  "preço: do menor para o maior": "price_low_to_high"
};

const splitQueryParam = (queryParam: undefined | string | string[]) => {
  if (!queryParam) {
    return;
  }

  return typeof queryParam === "string" ? queryParam.split(",") : queryParam;
};

type Props = { searchParams: CakeQueryParams };

async function LoadInitialCakes({ searchParams }: Props) {
  const { sortBy, category, filling, frosting, search, size, type } =
    searchParams;

  const sortByLastValue = Array.isArray(sortBy)
    ? sortBy[sortBy.length - 1]
    : sortBy;

  try {
    const shouldGetCachedCakes =
      (!sortBy || sortBy === "popularidade") &&
      (!category || category.length === 0) &&
      (!filling || filling.length === 0) &&
      (!frosting || frosting.length === 0) &&
      (!search || search.length === 0) &&
      (!size || size.length === 0) &&
      (!type || type.length === 0);

    if (shouldGetCachedCakes) {
      const { cakes, nextUrl } = await getFirstPageCakesCached();

      return <CakeList cakes={cakes} nextUrl={nextUrl} />;
    }

    const { cakes, nextUrl } = await getAllCakes({
      limit: "12",
      page: "1",
      search,
      type: splitQueryParam(type),
      category: splitQueryParam(category),
      size: splitQueryParam(size),
      filling: splitQueryParam(filling),
      frosting: splitQueryParam(frosting),
      sortBy: SORT_BY_API_OPTIONS[sortByLastValue || ""] ?? undefined
    });

    return <CakeList cakes={cakes} nextUrl={nextUrl} />;
  } catch (error: any) {
    const statusCode = error instanceof CustomError ? error.status : 500;

    return (
      <div className={styles.errorDiv}>
        <h5>
          {statusCode === 404
            ? "Nenhum resultado encontrado!"
            : "Ocorreu um erro no servidor! por favor tente novamente mais tarde"}
        </h5>

        {statusCode !== 404 && <RefreshPageButton />}
      </div>
    );
  }
}

type CakeListProps = {
  cakes: ICake[];
  nextUrl: string | null;
};

function CakeList({ cakes, nextUrl }: CakeListProps) {
  return (
    <>
      {cakes.map((cake) => (
        <CakeCard
          key={cake._id}
          id={cake._id}
          name={cake.name}
          imageUrl={cake.imageUrl}
          price={formatPriceNumber(cake.totalPricing)}
          categories={cake.categories}
          customizableParts={cake.customizableParts}
        />
      ))}

      <LoadNextCakes nextUrl={nextUrl || undefined} />
    </>
  );
}

export default LoadInitialCakes;
