export const parseLocaleNumber = (value) => {
  if (typeof value !== "string" || !value.trim()) return null;

  const normalized = value.replace(",", ".");
  if (!/^-?\d*\.?\d*$/.test(normalized)) return null;

  const num = parseFloat(normalized);
  return isNaN(num) ? null : num;
};
