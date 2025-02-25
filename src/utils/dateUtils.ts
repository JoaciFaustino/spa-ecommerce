const addZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

type DatePart = string | number;

export const formatDateTimeString = (
  date: Date
): `${DatePart}/${DatePart}/${DatePart} às ${DatePart}:${DatePart}` => {
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
};

export const normalizeDate = (
  date: number | string | Date | undefined
): Date | null => {
  const dateNormalized = new Date(date || "not valid date");

  return isNaN(dateNormalized.getTime()) ? null : dateNormalized;
};

export const verifyDeliveryIsLate = (date: Date | null) =>
  date && !isNaN(date.getTime()) && new Date() > date;

export const getDateString = (date: Date): string =>
  isNaN(date.getTime()) ? "indefinido" : formatDateTimeString(date);
