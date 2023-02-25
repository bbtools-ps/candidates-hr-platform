export const convertDate = (dateStr: string | undefined) => {
  if (!dateStr) throw new Error("No date.");
  const dateArr = dateStr.match(/\d+/g);
  if (!dateArr) throw new Error("Dates must be numbers.");
  return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
};
