function highlightedSubstring(str, subStr, part) {
  const position = noCaseIndexOf(str, subStr);
  if (!str) {
    return false;
  }
  if (part === "prefix") {
    return str.substring(0, position);
  }
  if (part === "term") return str.substring(position, position + subStr.length);
  if (part === "suffix") {
    return str.substring(position + subStr.length);
  }
}

function noCaseIndexOf(str, subStr) {
  if (!str || !subStr) {
    return false;
  }
  return str.toLowerCase().indexOf(subStr.toLowerCase());
}

function emphasizeSubstring(str, subStr, len) {
  if (!str || !subStr || !len) {
    return false;
  }
  let position = str.toLowerCase().indexOf(subStr.toLowerCase());
  let result =
    position > len / 2
      ? "..." + str.substring(Math.floor(len / 2), len - 3) + Math.ceil(len / 2)
      : str;
  position = result.toLowerCase().indexOf(subStr.toLowerCase());
  result =
    position < len
      ? result.substring(result.length - Math.ceil(len / 2), len - 3) + "..."
      : result;
}

function toListWithOptionalConjuction(arr, conj = "") {
  if (!arr || !arr.length) {
    return "";
  }
  return (
    arr.slice(0, arr.length - 1).join(", ") +
    (arr.length > 1 ? " " + conj + " " : "") +
    arr[arr.length - 1]
  );
}

export {
  highlightedSubstring,
  noCaseIndexOf,
  emphasizeSubstring,
  toListWithOptionalConjuction,
};
