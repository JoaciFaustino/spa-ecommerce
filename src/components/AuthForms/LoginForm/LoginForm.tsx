"use client";
import styles from "../AuthForms.module.scss";
import Link from "next/link";
import Input from "../Input/Input";
import { AuthResponse } from "@/@types/Auth";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import { useLoginForm } from "./useLoginForm";
import { LoginAction } from "@/actions/auth";

type Props = {
  loginAction: LoginAction;
};

function LoginForm({ loginAction }: Props) {
  const {
    errors,
    handleSubmit,
    register,
    submitIsDisabled,
    isSubmitting,
    isLogged
  } = useLoginForm(loginAction);

  return (
    <div className={styles.divForm}>
      <h3>Bem vindo de volta</h3>
      <p className="textBig">
        Bem vindo de volta! Por favor insira suas credenciais
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          {...register("email", { required: true })}
          label="email"
          type="email"
          error={errors.email?.message}
          autoFocus
        />

        <Input
          {...register("password", { required: true })}
          label="Senha"
          type="password"
          error={errors.password?.message}
        />

        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={submitIsDisabled}
        >
          {isSubmitting || isLogged ? (
            <SpinnerLoader color="#fff" size={1} unitSize="rem" />
          ) : (
            "Login"
          )}
        </button>

        <p className={`${styles.textSignUp} textBig`}>
          Ainda não possui uma conta?{" "}
          <Link href="/signup">Se cadastre aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
