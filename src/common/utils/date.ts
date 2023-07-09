export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

/**
 * Converts the dateString format from MM/DD/YYYY to YYYY-MM-DD
 * @param dateStr string
 * @returns string
 */
export const convertDate = (dateStr: string | undefined) => {
  if (!dateStr) return;
  const dateArr = dateStr.match(/\d+/g);
  if (!dateArr || dateArr.length !== 3)
    throw new Error("No numbers found in date string.");
  const [month, day, year] = dateArr;
  if (year.length !== 4 || month.length !== 2 || day.length !== 2)
    throw new Error("Not appropriate number format MM/DD/YYYY");
  return `${year}-${month}-${day}`;
};
