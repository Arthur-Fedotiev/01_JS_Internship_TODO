export default (data) => {
  const err = {};
  const specialCharacters = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
  const containsSymbols = data.value.match(specialCharacters);

  if (containsSymbols)
    err[data.name] = "Task must not include special characters!";
  if (!data.value) err[data.name] = "This field cannot be empty!";
  return err;
};
