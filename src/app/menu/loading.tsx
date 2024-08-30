import CakeCardSkeleton from "@/components/CakeCard/loading";
import FiltersBarSkeleton from "./components/FiltersBar/loading";
import styles from "@/styles/pages/Menu.module.scss";

function MenuPageLoading() {
  return (
    <section className={styles.menu}>
      <FiltersBarSkeleton />

      <div className={styles.menuCakes}>
        <div className={`${styles.wrapper} wrapper grid`}>
          {Array.from({ length: 12 }).map((_, index) => (
            <CakeCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default MenuPageLoading;
