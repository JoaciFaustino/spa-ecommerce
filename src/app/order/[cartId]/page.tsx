"use server";
import styles from "@/styles/pages/Order.module.scss";
import Products from "./components/Products/Products";
import OrderForm from "./components/OrderForm/OrderForm";
import { redirect } from "next/navigation";
import { getCartById } from "@/actions/cart";

type Props = {
  params: { cartId: string };
};

async function OrderPage({ params: { cartId } }: Props) {
  try {
    const cart = await getCartById(cartId);

    if (!cart || cart.cakes.length === 0) {
      redirect("/menu?sortBy=popularidade");
    }

    return (
      <section className={styles.orderPage}>
        <div className={`wrapper ${styles.wrapper}`}>
          <Products />

          <OrderForm cartId={cart._id} />
        </div>
      </section>
    );
  } catch (error) {
    redirect("/menu?sortBy=popularidade");
  }
}

export default OrderPage;
