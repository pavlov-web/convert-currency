export const getArrayDateOffset = (offset) => {
  const dates = [];

  for (let i = 0; i < offset; i++) {
    const date = new Date(
      new Date().setTime(new Date().getTime() - 86400000 * i - 86400000)
    ).toLocaleDateString("en-CA");

    dates.push(date);
  }

  return dates;
};

export const currencyFormat = (num, currency) => {
  if (currency) {
    return new Intl.NumberFormat("ru-Ru", {
      style: "currency",
      currency: currency,
    }).format(num);
  } else {
    return new Intl.NumberFormat("ru-Ru").format(num);
  }
};

export const toFixed = (num) => {
  return Math.floor(num * 100) / 100;
};
