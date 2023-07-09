export const validateEmptyValue = (value: string) => value.trim() !== "";

export const validateEmail = (value: string) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);

export const validatePhoneNumber = (value: string) => /^[+]?\d+$/.test(value);

export const validateDate = (value: string) => {
  return value &&
    new Date(value) > new Date(new Date().setFullYear(1900)) &&
    new Date(value) < new Date()
    ? true
    : false;
};