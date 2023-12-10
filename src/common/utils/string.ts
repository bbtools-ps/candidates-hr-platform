export const converToKebabCase = (str: string | null | undefined) =>
  str
    ?.trim()
    .toLowerCase()
    .replace(/(^\W+|\W+$)/g, "")
    .replace(/\W+/g, "-");
