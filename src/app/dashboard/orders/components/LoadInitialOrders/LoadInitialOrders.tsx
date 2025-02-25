import styles from "@/styles/pages/Dashboard.module.scss";
import { getLastValue, splitQueryParam } from "@/utils/queryParams";
import {
  OrdersFiltersApiOption,
  OrdersFiltersOptionsTranslate,
  ordersFiltersTranslate,
  OrdersSortByApiOption,
  OrdersSortByTranslate,
  ORDERS_SORT_BY_OPTIONS_TRANSLATE,
  ordersSortByTranslate
} from "@/@types/OrdersFilters";
import { getAllOrders } from "@/services/order";
import LoadNextOrders from "../LoadNextOrders/LoadNextOrders";
import { redirect } from "next/navigation";
import { CustomError } from "@/utils/customError";
import RefreshPageButton from "@/components/RefreshPageButton/RefreshPageButton";

type Props = {
  filters?: string | string[];
  sortBy?: string | string[];
  search?: string | string[];
};

async function LoadInitialOrders({ filters, sortBy, search }: Props) {
  const sortByLastValue = getLastValue(sortBy);

  if (
    !sortByLastValue ||
    !ORDERS_SORT_BY_OPTIONS_TRANSLATE.includes(
      sortByLastValue as OrdersSortByTranslate
    )
  ) {
    const defaultSortBy: OrdersSortByTranslate = "mais novos";
    redirect(`/dashboard/orders/?sortBy=${encodeURIComponent(defaultSortBy)}`);
  }

  const searchLastValue = getLastValue(search);

  const filtersSplitted = splitQueryParam(filters);

  const sortByApiOption: OrdersSortByApiOption =
    ordersSortByTranslate[sortByLastValue as OrdersSortByTranslate] ?? "latest";

  const filtersApiOptions: OrdersFiltersApiOption[] | undefined =
    filtersSplitted
      ?.map(
        (filter) =>
          ordersFiltersTranslate[filter as OrdersFiltersOptionsTranslate] ??
          undefined
      )
      .filter((filter) => filter !== undefined);

  try {
    const { orders, nextUrl } = await getAllOrders({
      page: 1,
      limit: 6,
      filters: filtersApiOptions || [],
      sortBy: sortByApiOption,
      search: searchLastValue
    });

    return (
      <>
        <LoadNextOrders firstOrders={orders} nextUrl={nextUrl} />
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

export default LoadInitialOrders;
