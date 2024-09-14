"use server";
import styles from "./UserInfo.module.scss";
import Cart from "../Cart/Cart";
import Profile from "../Profile/Profile";
import { getUserLogged } from "@/actions/user";
import { User } from "@/@types/User";
import { Suspense } from "react";
import { getCartById } from "@/actions/cart";
import type { Cart as CartType } from "@/@types/Cart";
import Buttons from "./components/Buttons";

async function UserInfo() {
  return (
    <div className={styles.divUser}>
      <Suspense
        fallback={
          <>
            <span className={`${styles.iconSkeleton} loading`}></span>
            <span className={`${styles.iconSkeleton} loading`}></span>
          </>
        }
      >
        <ProfileSuspense />
      </Suspense>
    </div>
  );
}

async function ProfileSuspense() {
  const user: User | undefined = await getUserLogged();

  return user ? (
    <>
      <Suspense
        fallback={<span className={`${styles.iconSkeleton} loading`}></span>}
      >
        <CartSuspense cartId={user.cartId} />
      </Suspense>

      <Profile user={user} />
    </>
  ) : (
    <Buttons />
  );
}

async function CartSuspense({ cartId }: { cartId: string }) {
  const cart: CartType | undefined = await getCartById(cartId);

  return <Cart cart={cart} />;
}

export default UserInfo;
