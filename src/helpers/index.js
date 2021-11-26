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
