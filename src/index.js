/* eslint-disable no-param-reassign */
/* eslint-disable global-require */

const CssBlocks = require('@css-blocks/jsx')
const { CssBlocksPlugin } = require('@css-blocks/webpack')

function rewireModernizrPlugin(config, env, cssBlocksConfig = {}) {
  const {
    appIndexJs = 'src/index.js',
    jsxOptions = {},
    webpackOptions = {},
  } = cssBlocksConfig

  const CssBlockRewriter = new CssBlocks.Rewriter()
  const CssBlockAnalyzer = new CssBlocks.Analyzer(appIndexJs, jsxOptions)

  config.plugins = config.plugins || []
  config.plugins.push(
    new CssBlocksPlugin({
      analyzer: CssBlockAnalyzer,
      outputCssFile: webpackOptions.outputCssFile || 'styles.css',
      name: webpackOptions.name || 'css-blocks',
      compilationOptions: webpackOptions.compilationOptions,
      optimization: webpackOptions.optimization,
    }),
  )

  config.module = config.module || {}
  config.module.rules = (config.module.rules || []).concat([
    {
      test: /\.[j|t]s(x?)$/,
      exclude: /node_modules/,
      use: [
        /* All Other Loaders Go Here */

        {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              require('@css-blocks/jsx/dist/src/transformer/babel').makePlugin({
                rewriter: CssBlockRewriter,
              }),
            ],
            cacheDirectory: true,
            compact: true,
            parserOpts: {
              plugins: ['jsx'],
            },
          },
        },

        // The JSX Webpack Loader halts loader execution until after all blocks have
        // been compiled and template analyses has been run. StyleMapping data stored
        // in shared `rewriter` object.
        {
          loader: require.resolve('@css-blocks/webpack/dist/src/loader'),
          options: {
            analyzer: CssBlockAnalyzer,
            rewriter: CssBlockRewriter,
          },
        },
      ],
    },
  ])

  return config
}

module.exports = rewireModernizrPlugin
