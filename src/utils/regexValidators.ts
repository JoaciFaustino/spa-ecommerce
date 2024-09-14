export const phoneNumberValidator = (string: string): boolean => {
  const regex = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/;

  return regex.test(string);
};
