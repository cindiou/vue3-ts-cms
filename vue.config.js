// const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
        views: "@/views",
        assets: "@/assets",
        utils: "@/utils",
        store: "@/store",
        services: "@/services",
      },
    },
    devServer: {
      proxy: {
        "^/backend": {
          target: "http://152.136.185.210:5000",
          pathRewrite: {
            "^/backend": "",
          },
          changeOrigin: true,
        },
      },
    },
  },
};
