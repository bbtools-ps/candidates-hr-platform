export const convertDate = (dateStr: string | undefined) => {
  if (!dateStr) return;
  const dateArr = dateStr.match(/\d+/g);
  if (!dateArr) throw new Error("No numbers found in date string.");
  return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
};
