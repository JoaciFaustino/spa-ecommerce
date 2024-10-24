import { auth } from "@/actions/auth";
import { getAllUserOrder } from "@/services/requests";
import { CustomError } from "@/utils/customError";
import { redirect } from "next/navigation";
import PurchasesErrorPage from "./error";
import styles from "@/styles/pages/Purchases.module.scss";
import OrderCard from "./components/OrderCard/OrderCard";
import LoadNextOrders from "./components/LoadNextOrders/LoadNextOrders";

type Props = {
  params: { userId: string };
};

async function PurchasesPage({ params: { userId } }: Props) {
  const payload = await auth();

  if (userId !== payload.userId) {
    redirect(`/`); //tem que fazer a pagina global de 401
  }

  try {
    const limit = 6;
    const page = 1;

    const { nextUrl, orders } = await getAllUserOrder(limit, page, userId);

    return (
      <section className={styles.mainSection}>
        <div className={`${styles.wrapper} wrapper`}>
          {orders.map((order) => (
            <OrderCard order={order} key={order._id} />
          ))}

          <LoadNextOrders nextUrl={nextUrl} />
        </div>
      </section>
    );
  } catch (error) {
    if (error instanceof CustomError && error.status === 401) {
      //tem que fazer a pagina global de 401

      redirect(`/`);
    }

    return <PurchasesErrorPage />;
  }
}

export default PurchasesPage;
