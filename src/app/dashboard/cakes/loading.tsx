import styles from "@/styles/pages/Dashboard.module.scss";
import AdminCakeCardLoading from "@/components/AdminCakeCard/loading";
import ScrollTop from "@/components/ScrollTop/ScrollTop";
import SearchAndCreateBarLoading from "../_components/SearchAndCreateBar/loading";

function DashboardCakesPage() {
  return (
    <section className={styles.parentPage}>
      <SearchAndCreateBarLoading />

      <div className={styles.list}>
        {Array.from({ length: 12 }).map((_, index) => (
          <AdminCakeCardLoading key={index} />
        ))}
      </div>

      <ScrollTop />
    </section>
  );
}

export default DashboardCakesPage;
