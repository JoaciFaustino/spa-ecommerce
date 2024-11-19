"use server";
import { redirect } from "next/navigation";
import { getCartById } from "@/actions/cart";
import OrderPageClientSide from "./components/OrderPageClientSide/OrderPageClientSide";

type Props = {
  params: { cartId: string };
};

async function OrderPage({ params: { cartId } }: Props) {
  try {
    const cart = await getCartById(cartId);

    if (!cart || cart.cakes.length === 0) {
      redirect("/menu?sortBy=popularidade");
    }

    return <OrderPageClientSide cartId={cartId} />;
  } catch (error) {
    redirect("/menu?sortBy=popularidade");
  }
}

export default OrderPage;
