import { User } from "./User";

export type AuthResponse = {
  user?: User;
  token?: string;
  error?: string;
};

export type Field = {
  value: string;
  isValid: boolean;
  wasBlur: boolean;
};

export type FieldsFormLogin = {
  email: Field;
  password: Field;
};

export type FieldsFormSignUp = {
  name: Field;
  username: Field;
  email: Field;
  password: Field;
  confirmPassword: Field;
};

export type KeyFieldSignUp = keyof FieldsFormSignUp;
export type KeyFieldLogin = keyof FieldsFormLogin;
