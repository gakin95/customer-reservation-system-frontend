export const allowNumbersOnly = (numbers, maxLength) => {
  if (numbers !== undefined && numbers !== null) {
    const filteredNum = numbers.replace(/\D/g, "");
    if (typeof maxLength === "number") {
      if (filteredNum.toString().length <= maxLength) {
        return filteredNum;
      }
      return filteredNum.toString().substring(0, maxLength);
    }
    return filteredNum;
  }
  return null;
};

const currencyFormat = (x) =>
  x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default currencyFormat;

export const numberWithCommas = () => {};
