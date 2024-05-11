import { CgShoppingCart } from "react-icons/cg";
import styles from "./UserInfo.module.scss";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/contexts/userProvider";

function UserInfo() {
  const [qntItemsCart, setQntItemsCart] = useState(999);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { handleLogout, user } = useContext(UserContext);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  const handleOpenAndCloseModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  const handleClickOutsideModal: EventListener = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalIsOpen(false);
    }
  };

  return (
    <div className={styles.divUser}>
      <div className={styles.divCart}>
        <CgShoppingCart
          style={{
            color: "var(--color-text-paragraph)",
            fontSize: "1rem"
          }}
        />
        <div className={styles.qntItemsCart}>
          {qntItemsCart > 0 && <span>{qntItemsCart}</span>}
        </div>
      </div>
      <div className={styles.userIcon}>
        <BiUserCircle
          onClick={handleOpenAndCloseModal}
          style={{
            color: "var(--color-text-paragraph)",
            fontSize: "2rem"
          }}
        />

        {modalIsOpen && (
          <div className={styles.userModal} ref={modalRef}>
            <ul>
              <Link href={`/user/${user?._id}`}>
                <li className="text">Gerenciar conta</li>
              </Link>

              {user?.role === "admin" && (
                <Link href={`/admin-dashboard/${user?._id}`}>
                  <li className="text">Admin Dashboard</li>
                </Link>
              )}

              <li
                className="text"
                style={{ color: "var(--color-warning-1)" }}
                onClick={(e) => handleLogout()}
              >
                Sair
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
