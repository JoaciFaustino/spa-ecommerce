export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const addZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

export const formatDateTimeString = (date: Date) => {
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1); // Months are 0-based, so add 1
  const year = date.getFullYear();

  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
};
