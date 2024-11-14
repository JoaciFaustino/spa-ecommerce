import { useState } from "react";

export const useInput = (defaultInputType: string) => {
  const [passwordIsShowed, setPasswordIsShowed] = useState(false);
  const [normalizedType, setNormalizedType] = useState(defaultInputType);

  const showPassword = () => {
    if (defaultInputType !== "password") {
      return;
    }

    setPasswordIsShowed(!passwordIsShowed);
    setNormalizedType(passwordIsShowed ? "password" : "text");
  };

  return { normalizedType, showPassword, passwordIsShowed };
};
