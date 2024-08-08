"use client";
import styles from "../AuthForms.module.scss";
import Link from "next/link";
import Input from "../Input/Input";
import { AuthResponse, FieldsFormSignUp } from "@/@types/Auth";
import { useAuthForm } from "@/hooks/useAuthForm";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";

const DEFAULT_FIELDS: FieldsFormSignUp = {
  name: { value: "", isValid: false, wasBlur: false },
  username: { value: "", isValid: false, wasBlur: false },
  email: { value: "", isValid: false, wasBlur: false },
  password: { value: "", isValid: false, wasBlur: false },
  confirmPassword: { value: "", isValid: false, wasBlur: false }
};

type Props = {
  signUpAction: (fields: FieldsFormSignUp) => Promise<AuthResponse>;
};

function SignUpForm({ signUpAction }: Props) {
  const {
    name,
    username,
    email,
    password,
    confirmPassword,
    handleChange,
    handleSubmit,
    handleBlur,
    allFieldsIsValid,
    reqIsPending
  } = useAuthForm<FieldsFormSignUp>(DEFAULT_FIELDS, signUpAction);

  return (
    <div className={styles.divForm}>
      <h3>Bem vindo</h3>
      <p className="textBig">Bem vindo! Por favor insira suas credenciais</p>

      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Nome"
          type="text"
          messageError="Nome é obrigatório"
          fieldStates={name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          autoFocus={true}
        />

        <Input
          name="username"
          label="Nome de usuário"
          type="text"
          messageError="Nome de usuário é obrigatório"
          fieldStates={username}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <Input
          name="email"
          label="Email"
          type="email"
          messageError="Digite um email válido!"
          fieldStates={email}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <Input
          name="password"
          label="Senha"
          type="password"
          fieldStates={password}
          handleBlur={handleBlur}
          handleChange={handleChange}
          messageError="A senha precisa ter no mínimo 8 caracteres"
        />

        <Input
          name="confirmPassword"
          label="Confirme sua senha"
          type="password"
          fieldStates={confirmPassword}
          handleBlur={handleBlur}
          handleChange={handleChange}
          messageError="As senhas não coincidem"
        />

        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={!allFieldsIsValid || reqIsPending}
        >
          {reqIsPending && (
            <SpinnerLoader color="#fff" size={1} unitSize="rem" />
          )}
          {!reqIsPending && "Registrar-se"}
        </button>

        <p className={`${styles.textSignUp} textBig`}>
          Já possui uma conta? <Link href="/login">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
