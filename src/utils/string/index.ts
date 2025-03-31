export const capitalizeFirstLetter = (str: string) => {
  if (str === "") {
    return str;
  }

  const splitStr = str.split("");
  const firstChar = splitStr[0];

  if (!firstChar) {
    return str;
  }

  splitStr[0] = firstChar.toUpperCase();
  return splitStr.join("");
};
