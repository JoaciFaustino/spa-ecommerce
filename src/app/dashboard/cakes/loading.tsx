import styles from "@/styles/pages/Dashboard.module.scss";
import SearchAndCreateCakesBar from "./components/SearchAndCreateBar/SearchAndCreateBar";
import AdminCakeCardLoading from "@/components/AdminCakeCard/loading";
import ScrollTop from "@/components/ScrollTop/ScrollTop";

function DashboardCakesPage() {
  return (
    <section className={styles.parentPage}>
      <SearchAndCreateCakesBar />

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
