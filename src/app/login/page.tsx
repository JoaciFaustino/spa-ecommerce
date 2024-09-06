"use server";
import { auth, login } from "@/actions/auth";
import styles from "../../styles/pages/Auth.module.scss";
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    redirect?: string | string[];
  };
};

async function Login({ searchParams }: Props) {
  const decodedToken = await auth();

  if (decodedToken?.userId) {
    const redirectUrl = Array.isArray(searchParams.redirect)
      ? searchParams.redirect[0]
      : searchParams.redirect;

    redirect(decodeURIComponent(redirectUrl || "/"));
  }

  return (
    <div className={styles.divAuth}>
      <LoginForm loginAction={login} />
    </div>
  );
}

export default Login;
