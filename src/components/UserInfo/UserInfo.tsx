"use server";
import styles from "./UserInfo.module.scss";
import Cart from "../Cart/Cart";
import Profile from "../Profile/Profile";
import Link from "next/link";
import { getUserLogged } from "@/actions/user";
import { User } from "@/@types/User";
import { Suspense } from "react";
import { getCartById } from "@/actions/cart";
import { Cart as CartType } from "@/@types/Cart";

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
        <ProfileServerComponent />
      </Suspense>
    </div>
  );
}

async function ProfileServerComponent() {
  const user: User | undefined = await getUserLogged();

  if (!user) {
    return (
      <>
        <Link href="/login">
          <button className={styles.btnLogin}>Login</button>
        </Link>
        <Link href="/signup">
          <button className={styles.btnSignup}>Cadastrar-se</button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Suspense
        fallback={<span className={`${styles.iconSkeleton} loading`}></span>}
      >
        <CartServerComponent cartId={user.cartId} />
      </Suspense>

      <Profile user={user} />
    </>
  );
}

async function CartServerComponent({ cartId }: { cartId: string }) {
  const cart: CartType | undefined = await getCartById(cartId);

  return <Cart cart={cart} />;
}

export default UserInfo;
