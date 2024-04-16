import { Cake } from "../@types/Cake";

export const getCakeBestSellers = async () => {
  const cakes: Cake[] = [];
  for (let i = 0; i < 12; i++) {
    cakes.push({
      _id: i,
      type: "chocolatudo",
      pricing: "20,00R$",
      imageUrl: "/images/chocolate-cake.png"
    });
  }
  return cakes;
};
