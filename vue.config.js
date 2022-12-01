module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~/node_modules/@picocss/pico/scss/pico.scss";
        `
      }
    }
  }
};