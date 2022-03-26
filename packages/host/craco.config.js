const ModuleFederation = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
  },
  webpack: {
    configure: {
      output: {
        publicPath: "http://localhost:8080/",
      },
      plugins: [
        new ModuleFederation({
          name: "host",
          remotes: {
            marketing: "marketing@http://localhost:8081/remoteEntry.js",
            auth: "auth@http://localhost:8082/remoteEntry.js",
            dashboard: "dashboard@http://localhost:8083/remoteEntry.js",
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps["react"],
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ],
    },
  },
};
