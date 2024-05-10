import {
  AuthServiceResponse,
  Field,
  FieldsFormLogin,
  FieldsFormSignUp
} from "@/@types/Auth";
import { AuthContext } from "@/contexts/authProvider";
import { validateEmail } from "@/utils/validateEmail";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useContext,
  useEffect,
  useState
} from "react";

const ANIMATION_TIME_ERROR_POPUP = 1000 * 15;

export const useAuthForm = <T>(
  defaultFields: T,
  serverActionFn: (fields: T) => Promise<AuthServiceResponse>
) => {
  const router = useRouter();
  const [allFieldsIsValid, setAllFieldsIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reqIsPending, setReqIsPending] = useState(false);
  const [fields, setFields] = useState<T>(defaultFields);
  const { changeUser } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => setErrorMessage(""), ANIMATION_TIME_ERROR_POPUP);
  }, [errorMessage]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reqIsPending) {
      return;
    }

    if (!allFieldsIsValid) {
      setErrorMessage("Preencha todos os campos!");
      return;
    }

    setReqIsPending(true);

    const { error, userId, role } = await serverActionFn(fields);

    if (error) {
      setErrorMessage(error);
      setReqIsPending(false);
      clearFields(fields);
      return;
    }
    
    changeUser(userId as string, role as string);

    router.push("/");
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
    allFieldsIsValid,
    errorMessage
  };
};
