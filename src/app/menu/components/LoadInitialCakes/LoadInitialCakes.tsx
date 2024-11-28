"use server";
import { formatPriceNumber } from "@/utils/formatPrice";
import LoadNextCakes from "../LoadNextCakes/LoadNextCakes";
import CakeCard from "@/components/CakeCard/CakeCard";
import { CakeQueryParams } from "@/@types/QueryParams";
import styles from "./LoadInitialCakes.module.scss";
import { CustomError } from "@/utils/customError";
import RefreshPageButton from "@/components/RefreshPageButton/RefreshPageButton";
import { getInitialCakes } from "@/utils/getInitialCakes";

type Props = { searchParams: CakeQueryParams };

async function LoadInitialCakes({ searchParams }: Props) {
  try {
    const { cakes, nextUrl } = await getInitialCakes(searchParams);

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

export default LoadInitialCakes;
