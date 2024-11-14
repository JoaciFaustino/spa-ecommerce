"use client";
import styles from "../AuthForms.module.scss";
import Link from "next/link";
import Input from "../Input/Input";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import { SignUpAction } from "@/actions/auth";
import { useSignUpForm } from "./useSignUpForm";

type Props = {
  signUpAction: SignUpAction;
};

function SignUpForm({ signUpAction }: Props) {
  const {
    handleSubmit,
    register,
    submitIsDisabled,
    errors,
    isSubmitting,
    isLogged
  } = useSignUpForm(signUpAction);

  return (
    <div className={styles.divForm}>
      <h3>Bem vindo</h3>
      <p className="textBig">Bem vindo! Por favor insira suas credenciais</p>

      <form onSubmit={handleSubmit}>
        <Input
          {...register("name", { required: true })}
          label="Nome"
          type="text"
          error={errors.name?.message}
          autoFocus
        />

        <Input
          {...register("username", { required: true })}
          label="Nome de usuário"
          type="text"
          error={errors.username?.message}
        />

        <Input
          {...register("email", { required: true })}
          label="email"
          type="email"
          error={errors.email?.message}
        />

        <Input
          {...register("password", { required: true })}
          label="Senha"
          type="password"
          error={errors.password?.message}
        />

        <Input
          {...register("confirmPassword", { required: true })}
          label="Confirme sua senha"
          type="password"
          error={errors.confirmPassword?.message}
        />

        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={submitIsDisabled}
        >
          {isSubmitting || isLogged ? (
            <SpinnerLoader color="#fff" size={1} unitSize="rem" />
          ) : (
            "Registrar-se"
          )}
        </button>

        <p className={`${styles.textSignUp} textBig`}>
          Já possui uma conta? <Link href="/login">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
