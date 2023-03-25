const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  /* eslint-disable no-param-reassign */
  configureWebpack: (config) => {
    config.devtool = "source-map";
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "~/node_modules/@picocss/pico/scss/pico.scss";
          `,
      },
    },
  },
});
