"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./RefreshPageButton.module.scss";
import { TbRefresh } from "react-icons/tb";
import { useRef, useState } from "react";

function RefreshPageButton() {
  const [isClicked, setIsClicked] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    if (isClicked) {
      return;
    }

    setIsClicked(true);

    router.replace(`${pathName}?${searchParams.toString()}`);

    btnRef?.current?.classList.add(styles.reloaded);
  };

  return (
    <button
      className={styles.btn}
      onClick={handleClick}
      ref={btnRef}
      disabled={isClicked}
    >
      <TbRefresh style={{ color: "#fff", fontSize: "1rem" }} />
      Tentar novamente
    </button>
  );
}

export default RefreshPageButton;
