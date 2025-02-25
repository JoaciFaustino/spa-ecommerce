export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getStringItensListed = (
  itens: string[],
  delimiter: ", " | "; " = ", "
): string => {
  return itens.length > 1
    ? itens.slice(0, -1).join(delimiter) + " e " + itens[itens.length - 1]
    : itens[0];
};
