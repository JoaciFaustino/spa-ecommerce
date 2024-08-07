"use client";
import styles from "../AuthForms.module.scss";
import Link from "next/link";
import Input from "../Input/Input";
import { AuthResponse, FieldsFormLogin } from "@/@types/Auth";
import { useAuthForm } from "@/hooks/useAuthForm";

const DEFAULT_FIELDS: FieldsFormLogin = {
  email: { value: "", isValid: false, wasBlur: false },
  password: { value: "", isValid: false, wasBlur: false }
};

type Props = {
  loginAction: (fields: FieldsFormLogin) => Promise<AuthResponse>;
};

function LoginForm({ loginAction }: Props) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    email,
    password,
    reqIsPending,
    allFieldsIsValid
  } = useAuthForm<FieldsFormLogin>(DEFAULT_FIELDS, loginAction);

  return (
    <div className={styles.divForm}>
      <h3>Bem vindo de volta</h3>
      <p className="textBig">
        Bem vindo de volta! Por favor insira suas credenciais
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          label="email"
          type="text"
          fieldStates={email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          autoFocus={true}
          messageError="Digite um email válido!"
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

        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={!allFieldsIsValid || reqIsPending}
        >
          {reqIsPending && <div className={styles.loader}></div>}
          {!reqIsPending && "Login"}
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
