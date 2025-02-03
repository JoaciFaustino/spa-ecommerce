//font: https://adevindev.xyz/post/como-formatar-moeda-em-javascript
export const formatPriceNumber = (price: number): string => {
  const real = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return real.format(price);
};

export const priceRegex = /R\$\s([0-9]{1,3})(?:,([0-9]{2}))?/;
