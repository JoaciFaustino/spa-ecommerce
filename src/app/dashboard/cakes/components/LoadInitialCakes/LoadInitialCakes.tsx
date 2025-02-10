import { CustomError } from "@/utils/customError";
import styles from "@/styles/pages/Dashboard.module.scss";
import RefreshPageButton from "@/components/RefreshPageButton/RefreshPageButton";
import LoadNextCakes from "../LoadNextCakes/LoadNextCakes";
import { getInitialCakes } from "@/utils/getInitialCakesAndCakeParts";

type Props = {
  searchParams: { search?: string };
};

async function LoadInitialCakes({ searchParams }: Props) {
  try {
    const { cakes, nextUrl } = await getInitialCakes(searchParams);

    return <LoadNextCakes firstCakes={cakes} nextUrl={nextUrl || undefined} />;
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
