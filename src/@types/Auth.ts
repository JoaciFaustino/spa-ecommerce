export type AuthServiceResponse = {
  userId?: string;
  token?: string;
  error?: string;
  role?: string;
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
