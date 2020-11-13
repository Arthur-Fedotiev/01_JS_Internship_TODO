export default (invalidaDatesArray) => {
  const dates = invalidaDatesArray.map((d) => {
    const date = d.slice(0, 10).split("/");
    return [date.pop(), ...date].join("-");
  });
  return dates;
};
