"use client";
import Link from "next/link";
import styles from "./Nav.module.scss";
import { usePathname } from "next/navigation";

function Nav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <NavLink href="/dashboard/cakes" label="Bolos" pathname={pathname} />

      <NavLink
        href="/dashboard/cake-types"
        label="Tipos de massa"
        pathname={pathname}
      />

      <NavLink
        href="/dashboard/categories"
        label="Categorias"
        pathname={pathname}
      />

      <NavLink
        href="/dashboard/fillings"
        label="Recheios"
        pathname={pathname}
      />

      <NavLink
        href="/dashboard/frostings"
        label="Coberturas"
        pathname={pathname}
      />

      <NavLink href="/dashboard/orders" label="Pedidos" pathname={pathname} />
    </nav>
  );
}

type NavLinkProps = {
  href: string;
  label: string;
  pathname: string;
};

function NavLink({ href, label, pathname }: NavLinkProps) {
  const isActived = pathname.split("?")[0] === href;

  return (
    <Link
      className={`text ${styles.link} ${isActived ? styles.actived : ""}`}
      href={href}
    >
      {label}
    </Link>
  );
}

export default Nav;
