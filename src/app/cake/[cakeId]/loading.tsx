import styles from "@/styles/pages/Cake.module.scss";
import CustomizeCakeFormSkeleton from "./components/CustomizeCakeForm/loading";

function CakePageLoading() {
  return (
    <section className={styles.mainSection}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={`${styles.divImage} loading`}></div>

        <div className={styles.divContent}>
          <h1 className={`loading  ${styles.loading}`}></h1>

          <div className={styles.divCategories}>
            {Array.from({ length: 5 }).map((_, index) => (
              <p
                key={index}
                className={`text loading ${styles.category} ${styles.loading}`}
              ></p>
            ))}
          </div>

          <CustomizeCakeFormSkeleton />
        </div>
      </div>
    </section>
  );
}
export default CakePageLoading;
