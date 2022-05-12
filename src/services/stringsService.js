export default {
  stringWithEmphasizedSubstring(str, subStr, len = 21) {
    if (!str || !subStr || !len) {
      return false;
    }
    const position = str.search(subStr);
    if (position === -1) {
      return false;
    }
  },
  emphasizeSubstring(str, subStr, len) {
    let position = str.toLowerCase().indexOf(subStr.toLowerCase());
    let result =
      position > len / 2
        ? "..." +
          str.substring(Math.floor(len / 2), len - 3) +
          Math.ceil(len / 2)
        : str;
    position = result.toLowerCase().indexOf(subStr.toLowerCase());
    result =
      position < len
        ? result.substring(result.length - Math.ceil(len / 2), len - 3) + "..."
        : result;
  },
};
