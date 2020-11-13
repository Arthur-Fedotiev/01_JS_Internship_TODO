export default (date) => {
  const index = date.indexOf(",");
  return date.substring(0, index);
};
