export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

// VALIDATORS

export const validateEmptyValue = (value: string) => value.trim() !== "";

export const validateEmail = (value: string) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);

export const validatePhoneNumber = (value: string) => /^[+]?\d+$/.test(value);

export const validateDate = (value: string) => {
  console.log(value);
  return value &&
    new Date(value) > new Date(new Date().setFullYear(1900)) &&
    new Date(value) < new Date()
    ? true
    : false;
};
