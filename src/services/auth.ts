import {
  AuthServiceResponse,
  FieldsFormLogin,
  FieldsFormSignUp
} from "@/@types/Auth";
import { api } from "./api";

// export const signUp = async (
//   fields: FieldsFormSignUp
// ): Promise<AuthServiceResponse> => {
//   try {
//     const { name, username, email, password, confirmPassword } = fields;

//     const { data } = await api.post("/auth/signup", {
//       name: name.value,
//       username: username.value,
//       email: email.value,
//       password: password.value,
//       confirmPassword: confirmPassword.value
//     });

//     localStorage.removeItem("session");
//     localStorage.setItem("session", data.token);

//     return {
//       userId: data.userId as string,
//       token: data.token as string
//     };
//   } catch (error: any) {
//     const { status, data } = error.response;

//     switch (status) {
//       case 400:
//         return { error: "Por favor, preencha todos os campos" };

//       case 409:
//         if (data?.message.includes(" name")) {
//           return { error: "Esse nome já existe! tente outro por favor" };
//         }
//         if (data?.message.includes(" username")) {
//           return {
//             error: "Esse nome de usuário já existe! tente outro por favor"
//           };
//         }

//         return { error: "Esse email já existe! tente outro por favor" };

//       case 500:
//         return {
//           error:
//             "Ocorreu um erro no servidor, por favor tente novamente mais tarde"
//         };

//       default:
//         return { error: "Ocorreu um erro, por favor tente novamente" };
//     }
//   }
// };

// export const login = async (
//   fields: FieldsFormLogin
// ): Promise<AuthServiceResponse> => {
//   try {
//     const { email, password } = fields;

//     const { data } = await api.post("/auth/login", {
//       email: email.value,
//       password: password.value
//     });

//     return {
//       userId: data?.userId,
//       token: data?.token
//     };
//   } catch (error: any) {
//     const { status } = error.response;

//     switch (status) {
//       case 401:
//         return { error: "Email ou senha incorretos" };

//       case 400:
//         return { error: "Por favor, preencha todos os campos" };

//       case 500:
//         return {
//           error:
//             "Ocorreu um erro no servidor, por favor tente novamente mais tarde"
//         };

//       default:
//         return { error: "Ocorreu um erro por favor tente novamente" };
//     }
//   }
// };

// export const userIsLogged = (): boolean => {
//   return !!localStorage.getItem("session");
// };

// export const logout = () => {
//   localStorage.deleteItem("session");
// };
