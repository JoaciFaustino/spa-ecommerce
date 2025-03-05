"use client";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import AsideMenu from "../AsideMenu/AsideMenu";
import { CgMenu } from "react-icons/cg";
import { useHeader } from "./useHeader";
import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import logo from "../../../public/images/logo.png";

function Header({ userInfoComponent }: { userInfoComponent: React.ReactNode }) {
  const pathName = usePathname();
  const { handleOpenAndCloseAsideMenu, headerRef, openAsideMenu } = useHeader();
  const pageIsAuth: boolean = pathName === "/login" || pathName === "/signup";

  return !pageIsAuth ? (
    <header className={styles.header} ref={headerRef}>
      {openAsideMenu && (
        <AsideMenu
          handleCloseAsideMenu={handleOpenAndCloseAsideMenu}
          userInfoComponent={userInfoComponent}
        />
      )}

      <div className={styles.wrapper + " wrapper"}>
        <button
          className={styles.btnHamburguer}
          onClick={handleOpenAndCloseAsideMenu}
        >
          <CgMenu style={{ color: "white", fontSize: "1.5rem" }} />
        </button>

        <div className={styles.divLogo}>
          <Link href="/">
            <Image src={logo} width={30} height={30} alt="logo" />
          </Link>
        </div>

        <Navbar className={styles.navbar} />

        {userInfoComponent}
      </div>
    </header>
  ) : (
    <></>
  );
}

export default Header;
