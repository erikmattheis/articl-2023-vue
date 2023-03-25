const { setTitleAndDescription } = require("@/services/htmlMetaService");

export default {
  methods: {
    setTitleAndDescriptionMixin(obj) {
      setTitleAndDescription(obj);
    },
  },
};
