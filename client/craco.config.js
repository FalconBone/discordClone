const path = require('path')
const CracoAlias = require('craco-alias')

const resolvePath = (p) => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      paths.appIndexJs = resolvePath('src/app/appEntry.tsx'); // Changing the path in CRA's config
      webpackConfig.entry = resolvePath('src/app/appEntry.tsx'); // Changing the entry point in Webpack config

      return webpackConfig;
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: './src',
        aliases: {
          "@": "./*",
          "@app": "./app/*",
          "@pages": "./pages/*"
        }
      }
    },
  ],
}