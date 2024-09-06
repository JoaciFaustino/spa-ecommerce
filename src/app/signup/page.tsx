"use server";
import SignUpForm from "@/components/AuthForms/SignUpForm/SignUpForm";
import styles from "../../styles/pages/Auth.module.scss";
import { auth, signUp } from "@/actions/auth";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    redirect?: string | string[];
  };
};

async function SignUp({ searchParams }: Props) {
  const decodedToken = await auth();

  if (decodedToken?.userId) {
    const redirectUrl = Array.isArray(searchParams.redirect)
      ? searchParams.redirect[0]
      : searchParams.redirect;

    redirect(decodeURIComponent(redirectUrl || "/"));
  }

  return (
    <div className={styles.divAuth}>
      <SignUpForm signUpAction={signUp} />
    </div>
  );
}

export default SignUp;
