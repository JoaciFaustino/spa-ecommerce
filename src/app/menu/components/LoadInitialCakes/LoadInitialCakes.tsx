"use server";
import { formatPriceNumber } from "@/utils/formatPrice";
import LoadNextCakes from "../LoadNextCakes/LoadNextCakes";
import CakeCard from "@/components/CakeCard/CakeCard";
import { CakeQueryParams } from "@/@types/QueryParams";
import { sortByApiOptions } from "@/@types/SortBy";
import { getAllCakes } from "@/services/requests";

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
  limit,
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

  const response = await getAllCakes({
    limit,
    page,
    search,
    type: splitQueryParam(type),
    category: splitQueryParam(category),
    size: splitQueryParam(size),
    filling: splitQueryParam(filling),
    frosting: splitQueryParam(frosting),
    sortBy: SORT_BY_API_OPTIONS[sortByLastValue || ""] ?? undefined
  });

  const { sucess } = response;

  if (!sucess && response.status === 404) {
    return <h5>Nenhum resultado encontrado!</h5>;
  }

  if (!sucess) {
    return (
      <h5 style={{ color: "var(--color-text-paragraph)" }}>
        Ocorreu um erro no servidor! por favor tente novamente mais tarde
      </h5>
    );
  }

  return (
    <>
      {response.cakes.map((cake) => (
        <CakeCard
          key={cake._id}
          cakeId={cake._id}
          nameCake={cake.name}
          typeCake={cake.type}
          imageCake={cake.imageUrl}
          priceCake={formatPriceNumber(cake.totalPricing)}
        />
      ))}
      <LoadNextCakes nextUrl={response.nextUrl || undefined} />
    </>
  );
}

export default LoadInitialCakes;
