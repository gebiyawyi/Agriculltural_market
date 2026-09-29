export const PRODUCT_COLORS = {
  Maize: "#4c72b0",
  Wheat: "#dd8452",
  Sorghum: "#55a868",
  Teff: "#c44e52",
  "Teff Fao": "#c44e52",
  Pasta: "#8172b3",
  "Livestock Goat": "#937860",
  "Livestock Sheep": "#da8bc3",
  "Food Price Index": "#8c8c8c",
};
export const DEFAULT_COLOR = "#64748b";
export function getProductColor(name) {
  return PRODUCT_COLORS[name] || DEFAULT_COLOR;
}
export const PAGE_SIZES = [10, 25, 50, 100];
export const CATEGORY_VARIANTS = {
  Grain: "success",
  Livestock: "warning",
  Index: "neutral",
  Other: "neutral",
};
