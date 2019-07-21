export const formatNumber = value =>
  new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "EUR",
  }).format(value);

export const randomColorGenerator = function() {
  return "#" + (Math.random().toString(16) + "0000000").slice(2, 8);
};

export const parseLocaleNumber = stringNumber => {
  const thousandSeparator = (1111).toLocaleString().replace(/1/g, "");
  const decimalSeparator = (1.1).toLocaleString().replace(/1/g, "");

  return parseFloat(
    stringNumber
      .replace(new RegExp("\\" + thousandSeparator, "g"), "")
      .replace(new RegExp("\\" + decimalSeparator), ".")
  );
};

export const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
