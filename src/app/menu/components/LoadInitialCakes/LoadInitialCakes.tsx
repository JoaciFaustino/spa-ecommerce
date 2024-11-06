"use server";
import { formatPriceNumber } from "@/utils/formatPrice";
import LoadNextCakes from "../LoadNextCakes/LoadNextCakes";
import CakeCard from "@/components/CakeCard/CakeCard";
import { CakeQueryParams } from "@/@types/QueryParams";
import { sortByApiOptions } from "@/@types/SortBy";
import { getAllCakes } from "@/services/cakes";
import styles from "./LoadInitialCakes.module.scss";
import Button from "./Button";
import { CustomError } from "@/utils/customError";

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

async function LoadInitialCakes({
  sortBy,
  page,
  type,
  category,
  size,
  filling,
  frosting,
  search
}: CakeQueryParams) {
  const sortByLastValue: string | undefined = Array.isArray(sortBy)
    ? sortBy[sortBy.length - 1]
    : sortBy;

  try {
    const { cakes, nextUrl } = await getAllCakes({
      limit: "20",
      page,
      search,
      type: splitQueryParam(type),
      category: splitQueryParam(category),
      size: splitQueryParam(size),
      filling: splitQueryParam(filling),
      frosting: splitQueryParam(frosting),
      sortBy: SORT_BY_API_OPTIONS[sortByLastValue || ""] ?? undefined
    });

    return (
      <>
        {cakes.map((cake) => (
          <CakeCard
            key={cake._id}
            cakeId={cake._id}
            nameCake={cake.name}
            typeCake={cake.type}
            imageCake={cake.imageUrl}
            priceCake={formatPriceNumber(cake.totalPricing)}
          />
        ))}
        <LoadNextCakes nextUrl={nextUrl || undefined} />
      </>
    );
  } catch (error: any) {
    if (error instanceof CustomError && error.status === 404) {
      return (
        <div className={styles.errorDiv}>
          <h5>Nenhum resultado encontrado!</h5>
        </div>
      );
    }

    return (
      <div className={styles.errorDiv}>
        <h5>
          Ocorreu um erro no servidor! por favor tente novamente mais tarde
        </h5>
        <Button />
      </div>
    );
  }
}

export default LoadInitialCakes;
