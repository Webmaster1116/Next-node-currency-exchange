// const withCSS = require("@zeit/next-css");
// module.exports = withCSS();

const withPlugins = require("next-compose-plugins");

const withImages = require("next-images");
const withImage = {
  webpack(config, options) {
    return config;
  },
};

const withPWA = require("next-pwa");
const withPwa = {
  pwa: {
    disable: false,
    register: true,
    scope: "/",
    sw: "sw.js",
    dest: "public",
  },
};

module.exports = withPlugins([
  [withImages, withImage],
  [withPWA, withPwa],
]);
