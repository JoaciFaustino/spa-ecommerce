"use server";
import styles from "@/styles/pages/Dashboard.module.scss";
import Nav from "./_components/Nav/Nav";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.mainSection}>
      <div className={`${styles.wrapper} wrapper`}>
        <Nav />

        {children}
      </div>
    </section>
  );
}

export default DashboardLayout;
