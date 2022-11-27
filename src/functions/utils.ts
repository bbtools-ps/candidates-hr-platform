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