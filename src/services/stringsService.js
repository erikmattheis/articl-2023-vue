const noCaseIndexOf = (str, subString) => {

  if (!str || !subString) {

    return false;

  }

  return str.toLowerCase().indexOf(subString.toLowerCase());

};
const highlightedSubstring = (str, subString, part) => {

  if (!subString && part === "prefix") {

    return str;

  }

  if (!subString) {

    return "";

  }

  const position = noCaseIndexOf(str, subString);

  if (!str) {

    return false;

  }

  if (part === "prefix") {

    return str.slice(0, Math.max(0, position));

  }

  if (part === "term") {

    return str.substring(position, position + subString.length);

  }

  if (part === "suffix") {

    return str.slice(Math.max(0, position + subString.length));

  }

  return str;

};
const toListWithOptionalConjuction = (array, conj = "") => {

  if (!array || array.length === 0 || !Array.isArray(array)) {

    return "";

  }

  return (
    array.slice(0, -1).join(", ") + (array.length > 1 ? ` ${conj} ` : "") + array[array.length - 1]
  );

};

export {
  highlightedSubstring,
  noCaseIndexOf,
  toListWithOptionalConjuction,
};
