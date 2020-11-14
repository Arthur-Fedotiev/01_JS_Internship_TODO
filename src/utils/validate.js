export default (data) => {
  const err = {};
  const specialCharacters = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
  const containsSymbols = data.value.match(specialCharacters);

  if (containsSymbols)
    err[data.name] = "Task must not include special characters!";
  if (!data.value) err[data.name] = "This field cannot be empty!";
  return err;
};

export const validateExpirationDate = (created, expired) =>
  Date.parse(expired) - Date.parse(created) < 0
    ? Date.parse(created) + 1000 * 60 * 60 * 24
    : expired;
