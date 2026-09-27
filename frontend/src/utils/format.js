export const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};
export const formatNumber = (n, digits = 2) => {
  if (n === null || n === undefined || isNaN(n)) return "-";
  return Number(n).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};
export const formatCurrency = (n) => {
  if (n === null || n === undefined || isNaN(n)) return "-";
  return `ETB ${formatNumber(n)}`;
};
