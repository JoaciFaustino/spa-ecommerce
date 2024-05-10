import { useRef, useState } from "react";

export const useInput = () => {
  const [passwordIsShowed, setPasswordIsShowed] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const showPassword = () => {
    setPasswordIsShowed(!passwordIsShowed);

    if (!inputRef.current) return;

    inputRef.current.type = passwordIsShowed ? "password" : "text";
  };

  return { inputRef, showPassword, passwordIsShowed };
};
