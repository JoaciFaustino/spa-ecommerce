"use server";
import { auth, login } from "@/actions/auth";
import styles from "../../styles/pages/Auth.module.scss";
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import { redirect } from "next/navigation";

async function Login() {
  const decodedToken = await auth();

  if (decodedToken?.userId) redirect("/");

  return (
    <div className={styles.divAuth}>
      <LoginForm loginAction={login} />
    </div>
  );
}

export default Login;
