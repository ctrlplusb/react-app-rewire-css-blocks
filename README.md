# react-app-rewire-css-blocks

Adds support for [CSS Blocks](http://css-blocks.com/) to your [`react-app-rewired`](https://github.com/timarney/react-app-rewired) config.

[![npm](https://img.shields.io/npm/v/react-app-rewire-css-blocks.svg?style=flat-square)](http://npm.im/react-app-rewire-css-blocks)
[![MIT License](https://img.shields.io/npm/l/react-app-rewire-css-blocks.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://img.shields.io/travis/ctrlplusb/react-app-rewire-css-blocks.svg?style=flat-square)](https://travis-ci.org/ctrlplusb/react-app-rewire-css-blocks)

## TOCs

  - [Installation](#installation)
  - [Usage](#usage)

## Installation

Note: `babel-loader` is a peer dependency.

```
npm install babel-loader react-app-rewire-css-blocks -D
```

_or_

```
yarn add babel-loader react-app-rewire-css-blocks -D
```

## Usage

Within your `react-app-rewire` config:

```javascript
const cssBlocksPlugin = require('react-app-rewire-css-blocks')

const pluginConfig = {
  appIndexJs: 'src/index.js'
} // See docs below for full details

// Adds support for modernizr
config = cssBlocksPlugin(
  config,
  env,
  pluginConfig // Option, see docs below
)
```

## Configuration

The configuration object that you provide to the plugin allows the following options to be configured:

 - __appIndexJs__ (_String_, _required_)

   The entry point to your application.

 - __jsxOptions__ (_Object_, _optional_)

   The jsx plugin configuration options. For full details see [here](http://css-blocks.com/api/modules/_css_blocks_jsx.html).

   It supports quite a complex configuration, however, you likely may only need to focus on __types__ if you are using Flow or Typescript.

   As a quick reference it supports the following options:

    - __baseDir__ (_optional_, _string_, Default: process.cwd())

    - __types__ (_optional_, _string_, Default: "none")

      "typescript" | "flow" | "none"

    - __aliases__ (_optional_, _Object_)

    - __compilationOptions__ (_optional_, _ResolvedConfiguration_)

    - __parserOptions__ (_optional_, _BabylonOptions_)

 - __webpackOptions__ (_optional_, _Object_)

   The configuration options for the CSS Blocks webpack plugin. For full details see [here](http://css-blocks.com/api/modules/_css_blocks_webpack.html).

   It supports quite a complex configuration, however, you likely may only need to focus on __outputCssFile__ and __optimization.enabled__.

   As a quick reference it supports the following options:

    - __name__: (_optional_, _string_, Default: "css-blocks")

    - __outputCssFile__: (_optional_, _string_, Default: "styles.css")

    - __compilationOptions__ (_optional_, _Object_)

        - __outputMode__ (_optional, _string_)

          Only "BEM" is supported at the moment.

        - __rootDir__: (_string_);

        - __maxConcurrentCompiles__ (_number_, Default: 4);

          Limits block parsing and compilation to this number at any one time.

        - __preprocessors__: (_Preprocessors_)

          A preprocessor function can be declared by syntax.

        - __importer__: (_Importer__)

        - __importerData__ (_ImporterData_)

        - __disablePreprocessChaining__ (_boolean_)

          If a preprocessor function is declared for `css`, all blocks will be ran through it, even those that were preprocessed for another syntax.
          this can be disabled by setting `disablePreprocessChaining` to true.

    - __optimization__ (_optional_, _Object_)

        - __enabled__ (_boolean_)

          Whether to perform any optimizations.

        - __only__: (_optional_, _Optimizations_)

          Only perform the optimizations specified and no others.

        - __except__?: (_optional_, _Optimizations_)

          Perform all optimizations except the ones specified. Overrides optimizations enabled by the `only` option.

        - __css__?: (_optional_, _Object_)

          Some CSS features can be used for more optimal output but may have
          varying level of support. These options control wether the optimizer
          will take advantage of those features where it can.

          CSS features are never output with vendor prefixes. You can try using
          autoprefixer or cssnext, but doing so is likely to result in output that
          is less optimal than if the optimization hadn't been performed.

           - __useMatchesPseudoClass__ (_boolean_)

             Indicates that class and id selectors should be treated as  case-insensitive.
             In quirksmode and some older doctypes, selectors are case  insensitive.
             Identifiers are more compressible when case sensitivity can be  assumed.

          - __caseInsensitiveSelectors__ (_boolean_)

Please see the [CSS Blocks](http://css-blocks.com/) docs for more information.
