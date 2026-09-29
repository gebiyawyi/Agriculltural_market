// export const formatDate = (iso) => {
//   if (!iso) return "";
//   const d = new Date(iso);
//   return d.toLocaleDateString("en-GB", {
//     year: "numeric",
//     month: "short",
//     day: "2-digit",
//   });
// };
// export const formatNumber = (n, digits = 2) => {
//   if (n === null || n === undefined || isNaN(n)) return "-";
//   return Number(n).toLocaleString("en-US", {
//     minimumFractionDigits: digits,
//     maximumFractionDigits: digits,
//   });
// };
// export const formatCurrency = (n) => {
//   if (n === null || n === undefined || isNaN(n)) return "-";
//   return `ETB ${formatNumber(n)}`;
// };
export function formatDate(iso, options = {}) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...options,
  });
}

export function formatMonth(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "short" });
}

export function formatNumber(n, digits = 2) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return Number(n).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatCurrency(n, currency = "ETB") {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return `${currency} ${formatNumber(n)}`;
}

export function formatInteger(n) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return Number(n).toLocaleString("en-US");
}

export function formatPercent(n, digits = 1) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return `${Number(n).toFixed(digits)}%`;
}