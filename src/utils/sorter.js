export const stringSorter = (array) =>
  array.sort((a, b) =>
    a.content.toLowerCase().localeCompare(b.content.toLowerCase())
  );

export const dateSorter = (array, objDate) =>
  array.sort(
    (obj1, obj2) =>
      new Date(obj1[objDate]).getTime() - new Date(obj2[objDate]).getTime()
  );
