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
