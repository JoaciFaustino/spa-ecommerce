import { auth } from "@/actions/auth";
import { getAllUserOrders } from "@/services/order";
import PurchasesErrorPage from "./error";
import styles from "@/styles/pages/Purchases.module.scss";
import OrderCard from "@/components/OrderCard/OrderCard";
import LoadNextOrders from "./components/LoadNextOrders/LoadNextOrders";
import ScrollTop from "@/components/ScrollTop/ScrollTop";
import Link from "next/link";
import { BsCartX } from "react-icons/bs";

type Props = {
  params: { userId: string };
};

async function PurchasesPage({ params: { userId } }: Props) {
  const payload = await auth();

  if (userId !== payload.userId) {
    return <PurchasesErrorPage />;
  }

  try {
    const limit = 6;
    const page = 1;

    const { nextUrl, orders } = await getAllUserOrders(limit, page, userId);

    const thereIsOrders = orders.length > 0;

    return (
      <section className={styles.mainSection}>
        <div className={`${styles.wrapper} wrapper`}>
          {!thereIsOrders && (
            <div className={styles.divText}>
              <h4>Você ainda não fez nenhum pedido!</h4>

              <BsCartX
                style={{
                  color: "var(--color-text-paragraph)",
                  fontSize: "12rem"
                }}
              />

              <Link href="/menu?sortBy=popularidade">
                <button>Ir para o menu</button>
              </Link>
            </div>
          )}

          {thereIsOrders && (
            <>
              {orders.map((order) => (
                <OrderCard order={order} key={order._id} />
              ))}
            </>
          )}

          {thereIsOrders && <LoadNextOrders nextUrl={nextUrl} />}
        </div>

        <ScrollTop />
      </section>
    );
  } catch (error) {
    return <PurchasesErrorPage />;
  }
}

export default PurchasesPage;
