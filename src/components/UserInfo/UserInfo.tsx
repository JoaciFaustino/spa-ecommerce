"use client";
import { useContext } from "react";
import styles from "./UserInfo.module.scss";
import { useUserInfo } from "./useUserInfo";
import { UserContext } from "@/contexts/userProvider";
import Cart from "../Cart/Cart";
import Profile from "../Profile/Profile";
import Link from "next/link";

function UserInfo() {
  const { reqIsPending } = useUserInfo();
  const { user } = useContext(UserContext);
  const isAuthenticated = !!user;

  return (
    <div className={styles.divUser}>
      {reqIsPending && (
        <>
          <span className={`${styles.iconSkeleton} loading`}></span>
          <span className={`${styles.iconSkeleton} loading`}></span>
        </>
      )}

      {!reqIsPending && isAuthenticated && (
        <>
          <Cart />
          <Profile />
        </>
      )}

      {!reqIsPending && !isAuthenticated && (
        <>
          <Link href="/login">
            <button className={styles.btnLogin}>Login</button>
          </Link>
          <Link href="/signup">
            <button className={styles.btnSignup}>Cadastrar-se</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default UserInfo;
