export default {
  set(name, val) {
    localStorage.setItem(name, val);
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "192.168.1.130"
    ) {
      // Chrome localhost bug
      localStorage.getItem(val);
    }
  },
  get(item) {
    const val = localStorage.getItem(item);
    return val;
  },
  clear() {
    return localStorage.clear();
  },
};
