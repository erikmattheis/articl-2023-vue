export default {
  set(name, val) {
    localStorage.setItem(name, val);
    if (window.location.hostname === 'localhost') {
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
