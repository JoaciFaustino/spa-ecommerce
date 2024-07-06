//font: https://adevindev.xyz/post/como-formatar-moeda-em-javascript
export const formatPriceNumber = (price: number): string => {
  const real = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return real.format(price);
};
