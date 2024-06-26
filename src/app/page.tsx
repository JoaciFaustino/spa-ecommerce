import styles from "../styles/pages/Home.module.scss";
import Image from "next/image";
import { getCakeBestSellers } from "../services/requests";
import { Cake } from "@/@types/Cake";
import CakeCard from "@/components/CakeCard/CakeCard";
import imgStrawberryCake from "../../public/images/strawberry-cake.png";
import { CgArrowTopRight } from "react-icons/cg";
import { BsStars, BsTruck } from "react-icons/bs";
import { GiThreeLeaves } from "react-icons/gi";

export default async function Home() {
  const cakesBestSellers: Cake[] = await getCakeBestSellers();

  return (
    <main className={styles.main}>
      <section className={styles.initialSection}>
        <div className={`${styles.wrapper} wrapper grid`}>
          <div className={styles.left}>
            <h2>Delicie-se com os sabores mais irresistíveis da confeitaria</h2>
            <button className="textBig">ver menu</button>
          </div>
          <div className={styles.right}>
            <div className={styles.mainCard}>
              <Image
                src={imgStrawberryCake}
                alt="strawberry cake"
                sizes="100vw"
                style={{ width: "50%", height: "auto" }}
              />
              <div className={styles.divText}>
                <h3>Explore as mais diversas opções de bolos</h3>
                <h4>Explore as mais diversas opções de bolos</h4>
                <button>
                  <CgArrowTopRight
                    className={styles.iconArrow}
                    style={{
                      color: "#fff"
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.sectionAdvantages}>
        <div className={`${styles.wrapper} wrapper`}>
          <h2>Nossas vantagens</h2>
          <div className={`grid ${styles.divSmallCards}`}>
            <div className={styles.smallCard} id={styles.cardOne}>
              <div className={styles.divIcon}>
                <BsStars
                  style={{
                    color: "#ffffff",
                    fontSize: "3.5rem"
                  }}
                />
              </div>
              <div className={styles.divText}>
                <h3>Produtos de alta qualidade</h3>
              </div>
            </div>
            <div className={styles.smallCard} id={styles.cardTwo}>
              <div className={styles.divIcon}>
                <BsTruck
                  style={{
                    color: "#ffffff",
                    fontSize: "3.5rem"
                  }}
                />
              </div>
              <div className={styles.divText}>
                <h3>Delivery rápido</h3>
              </div>
            </div>
            <div className={styles.smallCard} id={styles.cardThree}>
              <div className={styles.divIcon}>
                <GiThreeLeaves
                  style={{
                    color: "#ffffff",
                    fontSize: "3.5rem"
                  }}
                />
              </div>
              <div className={styles.divText}>
                <h3>Ingredientes frescos e receitas locais</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.sectionTimeLinePayment}>
        <div className={`${styles.wrapper} wrapper`}>
          <h2>Pagamento e delivery</h2>
        </div>
        <div className={styles.divTimeLine}>
          <div className={styles.divTopics}>
            <span className={styles.line}></span>
            <div className={styles.topic}>
              <span className={styles.dotTopic}></span>
              <h4>Pedido</h4>
              <p className="textBig">
                Escolha o que você quer e coloque no carrinho.
              </p>
            </div>
            <div className={styles.topic}>
              <span className={styles.dotTopic}></span>
              <h4>Pagamento</h4>
              <p className="textBig">
                Você pode pagar online ou em dinheiro para o entregador.
              </p>
            </div>
            <div className={styles.topic}>
              <span className={styles.dotTopic}></span>
              <h4>Delivery</h4>
              <p className="textBig">
                Nós entregamos em qualquer bairro ou comunidade da cidade.
              </p>
            </div>
            <div className={styles.topic}>
              <span className={styles.dotTopic}></span>
              <h4>Para sua casa</h4>
              <p className="textBig">Você vai amar nossos produtos!</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.sectionBestSellers}>
        <div className={`${styles.wrapper} wrapper grid`}>
          <h2>Mais vendidos</h2>
          {cakesBestSellers.map((cake) => (
            <CakeCard
              key={cake._id}
              typeCake={cake.type}
              imageCake={cake.imageUrl}
              priceCake={cake.pricing}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
