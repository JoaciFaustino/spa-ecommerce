import Link from "next/link";
import { usePathname } from "next/navigation";

const STYLE_ROUTE_ACTIVED = { color: "var(--primary-color)" };

type PropsNavbar = { className: string };

function Navbar({ className }: PropsNavbar) {
  return (
    <nav className={className}>
      <ul>
        <LinkBtn url="/" linkName="Home" />
        <LinkBtn url="/menu" linkName="Menu" />
        <LinkBtn url="/personalizados" linkName="Personalizados" />
        <LinkBtn url="/contatos" linkName="Contatos" />
      </ul>
    </nav>
  );
}

type PropsLinkBtn = { url: string; linkName: string };

function LinkBtn({ url, linkName }: PropsLinkBtn) {
  const pathName = usePathname();

  return (
    <Link href={url}>
      <li
        className="textBig"
        style={pathName === url ? STYLE_ROUTE_ACTIVED : {}}
      >
        {linkName}
      </li>
    </Link>
  );
}

export default Navbar;
