const fromRusLocale = (dateString) => {
  const dateArray = dateString.split(".");
  const item = dateArray.shift();
  dateArray.splice(1, 0, item);
  return dateArray.join("/");
};

export const dateSeparator = (date) => {
  const index = date.indexOf(",");
  const dateString = date.substring(0, index);
  return dateString;
};

export const dateToHTMLFormatter = (fullDateString) => {
  const separatedDate = dateSeparator(fullDateString);
  const isRusLocale = separatedDate.includes(".");

  const dateFromString = isRusLocale
    ? new Date(fromRusLocale(separatedDate))
    : new Date(separatedDate);
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
