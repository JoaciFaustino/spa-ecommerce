"use server";
import SignUpForm from "@/components/AuthForms/SignUpForm/SignUpForm";
import styles from "../../styles/pages/Auth.module.scss";
import { auth, signUp } from "@/actions/auth";
import { redirect } from "next/navigation";

async function SignUp() {
  const decodedToken = await auth();

  if (decodedToken?.userId) redirect("/");

  return (
    <div className={styles.divAuth}>
      <SignUpForm signUpAction={signUp} />
    </div>
  );
}

export default SignUp;
