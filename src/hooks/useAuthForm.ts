import {
  AuthResponse,
  Field,
  FieldsFormLogin,
  FieldsFormSignUp
} from "@/@types/Auth";
import { UserContext } from "@/contexts/userProvider";
import { validateEmail } from "@/utils/validateEmail";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useContext,
  useState
} from "react";
import { toast } from "react-toastify";

export const useAuthForm = <T>(
  defaultFields: T,
  serverActionFn: (fields: T) => Promise<AuthResponse>,
  redirect: string
) => {
  const router = useRouter();
  const [allFieldsIsValid, setAllFieldsIsValid] = useState(false);

  const [reqIsPending, setReqIsPending] = useState(false);
  const [fields, setFields] = useState<T>(defaultFields);
  const { changeUserLogged } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reqIsPending) {
      return;
    }

    if (!allFieldsIsValid) {
      toast.error("Preencha todos os campos!");

      return;
    }

    setReqIsPending(true);

    const { error, user } = await serverActionFn(fields);

    if (error || !user) {
      toast.error(error || "");
      setReqIsPending(false);
      clearFields(fields);
      return;
    }

    changeUserLogged(user);

    router.push(decodeURIComponent(redirect));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof T;

    const changedFields: T = {
      ...fields,
      [fieldName]: { ...fields[fieldName], value: e.target.value }
    };

    const condition = getCondition(fieldName, e.target.value, changedFields);
    const newFields: T = validateField(fieldName, condition, changedFields);

    setFields(newFields);
    setAllFieldsIsValid(validateAllFields(newFields));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof T;

    const bluredField: T = {
      ...fields,
      [fieldName]: {
        ...fields[fieldName],
        wasBlur: true,
        value: e.target.value.trim()
      }
    };

    const condition = getCondition(fieldName, e.target.value, bluredField);
    const newFields = validateField(fieldName, condition, bluredField);

    setFields(newFields);
    setAllFieldsIsValid(validateAllFields(newFields));
  };

  const validateField = (
    fieldName: keyof T,
    condition: boolean,
    fields: T
  ): T => {
    return {
      ...fields,
      [fieldName]: { ...fields[fieldName], isValid: condition }
    };
  };

  const clearFields = (fields: T) => {
    const keyFields = Object.keys(
      fields as FieldsFormLogin | FieldsFormSignUp
    ) as (keyof T)[];

    const defaultFields: T = keyFields.reduce((updatedFields: T, keyField) => {
      return {
        ...updatedFields,
        [keyField]: { value: "", isValid: false, wasBlur: false }
      };
    }, fields);

    setFields(defaultFields);
    setAllFieldsIsValid(false);
  };

  const validateAllFields = (fields: T): boolean => {
    const keyFields = Object.keys(
      fields as FieldsFormLogin | FieldsFormSignUp
    ) as (keyof T)[];

    const allIsValid = keyFields.every((key) => {
      return (fields[key] as Field).isValid;
    });

    return allIsValid;
  };

  const getCondition = (
    fieldName: keyof T,
    valueField: string,
    fields: T
  ): boolean => {
    if (fieldName === "email") return validateEmail(valueField);

    if (fieldName === "password") return valueField.length >= 8;

    if (fieldName === "confirmPassword") {
      return (
        (fields as FieldsFormSignUp).password.value === valueField &&
        valueField !== ""
      );
    }

    return valueField !== "";
  };

  return {
    ...fields,
    handleSubmit,
    handleChange,
    handleBlur,
    reqIsPending,
    allFieldsIsValid
  };
};
