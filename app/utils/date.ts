export const formatDate = (value: string | Date | null | undefined): string => {
  if (!value) return "No data";
  const date = new Date(value);
  return isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
};


export const compareDateEq = (a: string | Date | null | undefined, b: string | Date | null | undefined): boolean => {
  if (!a || !b) return false;
  const dateA = new Date(a);
  const dateB = new Date(b);
  if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return false;
  return dateA.getFullYear() === dateB.getFullYear() &&
         dateA.getMonth() === dateB.getMonth() &&
         dateA.getDate() === dateB.getDate();
};