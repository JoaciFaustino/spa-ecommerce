"use client";
import { useWindowScroll } from "@uidotdev/usehooks";
import styles from "./ScrollTop.module.scss";
import { CgArrowUp } from "react-icons/cg";

function ScrollTop() {
  const [{ y }, scrollTo] = useWindowScroll();
  const isVisible = y && y >= 600;

  const scrollToTop = () => scrollTo({ left: 0, top: 0, behavior: "smooth" });

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`${styles.scrollTop} ${isVisible ? styles.visible : ""}`}
    >
      <CgArrowUp style={{ color: "#fff", fontSize: "2.5rem" }} />
    </button>
  );
}

export default ScrollTop;
