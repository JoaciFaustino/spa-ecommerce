"use client";
import styles from "./Profile.module.scss";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "@/contexts/userProvider";
import { User } from "@/@types/User";
import { useModal } from "@/hooks/useModal";

function Profile({ user }: { user: User }) {
  const { handleLogout, changeUserLogged } = useContext(UserContext);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { toggleModal, modalIsOpen } = useModal(modalRef);

  useEffect(() => changeUserLogged(user), [user]);

  return (
    <div className={styles.userIcon}>
      <BiUserCircle
        onClick={toggleModal}
        style={{ color: "var(--color-text-title)", fontSize: "2rem" }}
      />

      {modalIsOpen && (
        <div className={styles.userModal} ref={modalRef}>
          <h6>
            Bem vindo <br />
            <span>{user?.username}</span>!
          </h6>
          <ul>
            <Link href={`/purchases/${user?._id}`}>
              <li className="text">Verificar pedidos</li>
            </Link>

            {user?.role === "admin" && (
              <Link href={`/dashboard/cakes`}>
                <li className="text">Admin Dashboard</li>
              </Link>
            )}

            <li
              className="text"
              style={{ color: "var(--color-warning-1)" }}
              onClick={handleLogout}
            >
              Sair
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
