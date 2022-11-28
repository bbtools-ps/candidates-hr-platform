export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

// VALIDATORS

export const validateEmptyValue = (value: string) => {
  return value.trim() !== "";
};

export const validateEmail = (value: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

export const validatePhoneNumber = (value: string) => {
  return /^[+]?\d+$/.test(value);
};

export const validateDate = (value: string) => {
  return value &&
    new Date(value) > new Date(new Date().setFullYear(1900)) &&
    new Date(value) < new Date()
    ? true
    : false;
};
