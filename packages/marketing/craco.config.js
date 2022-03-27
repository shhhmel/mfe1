const { whenDev } = require("@craco/craco");

const devConfig = require("./config/craco-config.dev");
const prodConfig = require("./config/craco-config.prod");

function getConfig(key, unmetValue) {
  return whenDev(
    () => devConfig[key] || unmetValue,
    prodConfig[key] || unmetValue
  );
}

module.exports = {
  devServer: getConfig("devServer", {}),
  webpack: {
    configure: {
      output: getConfig("output", {}),
      plugins: getConfig("plugins", []),
    },
  },
};
