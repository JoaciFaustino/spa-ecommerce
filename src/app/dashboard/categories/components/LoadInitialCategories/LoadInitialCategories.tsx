import styles from "@/styles/pages/Dashboard.module.scss";
import RefreshPageButton from "@/components/RefreshPageButton/RefreshPageButton";
import { getInitialCategories } from "@/utils/getInitialCakesAndCakeParts";
import { CustomError } from "@/utils/customError";
import LoadNextCategories from "../LoadNextCategories/LoadNextCategories";

type Props = {
  searchParams: { search?: string };
};

async function LoadInitialCategories({ searchParams }: Props) {
  try {
    const { categories, nextUrl } = await getInitialCategories(searchParams);

    return (
      <LoadNextCategories
        firstCategories={categories}
        nextUrl={nextUrl || undefined}
      />
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

export default LoadInitialCategories;
