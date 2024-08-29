"use server";
import {
  getAllCakeTypes,
  getAllFillings,
  getAllFrostings,
  getCakeById
} from "@/services/requests";
import styles from "@/styles/pages/Cake.module.scss";
import { notFound, redirect } from "next/navigation";
import { CustomError } from "@/utils/customError";
import Image from "next/image";
import CustomizeCakeForm from "./components/CustomizeCakeForm/CustomizeCakeForm";

type Props = {
  params: { cakeId: string };
};

async function CakePage({ params: { cakeId } }: Props) {
  try {
    await new Promise((resolve) => {
      setTimeout(() => resolve("chibanco"), 5000);
    });

    const [cake, cakeTypesRes, fillingsRes, frostingsRes] = await Promise.all([
      getCakeById(cakeId),
      getAllCakeTypes(),
      getAllFillings(),
      getAllFrostings()
    ]);

    const cakeTypes = cakeTypesRes?.map(({ type }) => type);

    return (
      <section className={styles.mainSection}>
        <div className={`${styles.wrapper} wrapper`}>
          <div className={styles.divImage}>
            <Image
              src={cake.imageUrl}
              alt={`Cake ${cake.name} Image`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.divContent}>
            <h1>{cake.name}</h1>
            {cake.categories.length > 0 && (
              <div className={styles.divCategories}>
                {cake.categories.map((category, index) => (
                  <p className={`text ${styles.category}`} key={index}>
                    {category}
                  </p>
                ))}
              </div>
            )}
            <CustomizeCakeForm
              typeOptions={cakeTypes}
              fillingsOptions={fillingsRes}
              frostingOptions={frostingsRes}
              defaultCake={cake}
            />
          </div>
        </div>
      </section>
    );
  } catch (error: any) {
    if (error instanceof CustomError && error.status === 401) {
      redirect("/login");
    }

    if (error instanceof CustomError && error.status === 404) {
      notFound();
    }

    return (
      <main className={styles.main}>
        <h1>Ocorreu um erro inesperado!</h1>
      </main>
    );
  }
}

export default CakePage;
