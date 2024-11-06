"use server";
import { getCakeById } from "@/services/cakes";
import styles from "@/styles/pages/Cake.module.scss";
import { notFound, redirect } from "next/navigation";
import { CustomError } from "@/utils/customError";
import Image from "next/image";
import CustomizeCakeForm from "./components/CustomizeCakeForm/CustomizeCakeForm";
import CakePageError from "./error";
import {
  getCakeTypesWithErrorHandling,
  getFillingsWithErrorHandling,
  getFrostingsWithErrorHandling
} from "@/utils/getCakePartsValues";

type Props = {
  params: { cakeId: string };
};

const limit = 12;
const page = 1;

async function CakePage({ params: { cakeId } }: Props) {
  try {
    const [cake, cakeTypes, fillings, frostings] = await Promise.all([
      getCakeById(cakeId),
      getCakeTypesWithErrorHandling(limit, page),
      getFillingsWithErrorHandling(limit, page),
      getFrostingsWithErrorHandling(limit, page)
    ]);

    if (!cake) {
      notFound();
    }

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
              typeOptions={cakeTypes.map(({ type }) => type)}
              fillingsOptions={fillings}
              frostingOptions={frostings}
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

    return <CakePageError />;
  }
}

export default CakePage;
