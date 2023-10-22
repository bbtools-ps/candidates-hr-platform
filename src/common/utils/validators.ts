export const validateEmptyValue = (value: string) => value.trim() !== "";

export const validateEmail = (value: string) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);

export const validatePhoneNumber = (value: string) =>
  /^(\+\d{3})?\s?(\(\d{3}\)|\d{2,3})\s?\d{3,4}-?\d{3}$/.test(value);

export const validateDate = (value: string) => {
  return value &&
    new Date(value) > new Date(new Date().setFullYear(1900)) &&
    new Date(value) < new Date()
    ? true
    : false;
};
