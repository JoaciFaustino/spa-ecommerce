import styles from "@/styles/pages/Cake.module.scss";
import CustomizeCakeFormSkeleton from "./components/CustomizeCakeForm/loading";

function CakePageLoading() {
  return (
    <section className={styles.mainSection}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={`${styles.divImage} loading`}></div>

        <div className={styles.divContent}>
          <h1 className={`loading`}>Cake name</h1>

          <div className={styles.divCategories}>
            {Array.from({ length: 4 }).map((_, index) => (
              <p className={`text loading ${styles.category}`} key={index}>
                category
              </p>
            ))}
          </div>

          <CustomizeCakeFormSkeleton />
        </div>
      </div>
    </section>
  );
}
export default CakePageLoading;
