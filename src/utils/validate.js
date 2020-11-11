export default (data) => {
  const err = {};
  if (data.value.match(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi))
    err[data.name] = "Task must not include special characters!";
  if (!data.value) err[data.name] = "This field cannot be empty!";
  return err;
};
