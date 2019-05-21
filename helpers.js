export const formatNumber = value =>
  new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "EUR"
  }).format(value);
