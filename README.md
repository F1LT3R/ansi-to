# ANSI-to

> 😹  export ANSI color strings to various formats: HTML, SVG, PNG.

[![Build Status](https://travis-ci.org/F1LT3R/ansi-to.svg?branch=master)](https://travis-ci.org/F1LT3R/ansi-to)
[![Coverage Status](https://coveralls.io/repos/github/F1LT3R/ansi-to/badge.svg?branch=master)](https://coveralls.io/github/F1LT3R/ansi-to?branch=master)
[![NPM Version](https://img.shields.io/npm/v/ansi-to.svg)](https://www.npmjs.com/package/ansi-to)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

ANSI-to takes a string of ANSI and converts it to various types of output.

For example, this SVG:

[![Lead Image](ansi-to-svg-example.svg)](ansi-to-svg-example.svg)

ANSI-to has the following plugins available:

- [SVG](https://github.com:F1LT3R/ansi-to-svg) - Export ANSI to Scalable Vector Graphics
- [<strike>HTML</strike>](https://github.com:F1LT3R/ansi-to-html) (coming soon)
- [<strike>PNG</strike>](https://github.com:F1LT3R/ansi-to-png) (coming soon)

Important: Do not use ANSI-to directly. Please use one of the above plugins.

**General Features**

- iTerm2 color support - [Base16 iTerm2 Color Schemes](https://github.com/martinlindhe/base16-iterm2)
- Use output in your `README.md` files
- Designed for use with [Chalk](https://github.com/chalk/chalk)
- Plugin architecture to build-your-own ANSI Parser
- Built-in default colors
- User can override colors
- Emoji support
- Powerline font support

## Why ANSI-to ?

ANSI-to is designed for use with ZTD development (Zero Technical Debt). ANSI-to provides a Markdown friendly way to include CLI output in your software documentation.

