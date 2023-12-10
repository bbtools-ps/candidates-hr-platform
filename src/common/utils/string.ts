export const convertToKebabCase = (str?: string) => {
  const result = str
    ?.toLowerCase()
    .replace(/(^[\W_]+|[\W_]+$)/g, "")
    .replace(/[\W_]+/g, "-");

  if (!result) return undefined;

  return result;
};
