export const dateSeparator = (date) => {
  const index = date.indexOf(",");
  return date.substring(0, index);
};

export const dateToHTMLFormatter = (fullDateString) => {
  const dateFromString = new Date(dateSeparator(fullDateString));

  const formattedDateString =
    dateFromString.getFullYear() +
    "-" +
    ("0" + (dateFromString.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + dateFromString.getDate()).slice(-2);

  return formattedDateString;
};

export const dateCreator = (...args) => {
  const [creationDate, expirationDate] = args;

  let created = creationDate ? new Date(creationDate) : new Date();
  let expired = expirationDate
    ? new Date(expirationDate).toLocaleString()
    : new Date(created);
  if (!expirationDate) {
    expired.setDate(expired.getDate() + 1);
    expired = expired.toLocaleString();
  }
  created = created.toLocaleString();
  return { created, expired };
};
