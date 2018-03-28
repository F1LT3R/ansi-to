# ANSI-to

> 😹  export ANSI color strings to HTML, Image w/ iTerm2 color support

[![Lead Image](examples/ansi-to-html-lead-image-example-zoomed.png)](examples/ansi-to-html-lead-image-example-zoomed.png)

[![Build Status](https://travis-ci.org/F1LT3R/ansi-to.svg?branch=master)](https://travis-ci.org/F1LT3R/ansi-to)
[![Coverage Status](https://coveralls.io/repos/github/F1LT3R/ansi-to/badge.svg?branch=master)](https://coveralls.io/github/F1LT3R/ansi-to?branch=master)
[![NPM Version](https://img.shields.io/npm/v/ansi-to.svg)](https://www.npmjs.com/package/ansi-to)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

**Features:**

- Convert to partial HTML for your blog
- Convert to Image for your README.md
- Designed for use with [Chalk](https://github.com/chalk/chalk)
- iTerm2 Preset support 
    + Eg: ANSI-to can load [`base16-tomorrow-night-256.itermcolors`](https://github.com/martinlindhe/base16-iterm2/blob/master/itermcolors/base16-tomorrow-night-256.itermcolors)
- Plugin architecture to add your own ANSI Parser
- Built-in default colors (HTML Color Names)
- Custom user-defined colors
- Custom user-defined container templates


## ANSI-to ... HTML

```js
const ansiTo = require('ansi-to')
const chalk = require('chalk')

const chalked = chalk`{red Foo} {yellow Bar} {green Baz} {blue Qux} {bgMagentaBright  WOMBAT! }`
console.log(chalked)

const html = ansiTo.html(chalked)
console.log(html)
```

Console Output:

![Figure 01 Console](examples/figure-01-console.png)

Browser Screenshot:

![Figure 01 Browser Screenshot](examples/figure-01-browser.png)

## ANSI-to.load.iTerm2Colors

```js
const ansiTo = require('ansi-to')
const chalk = require('chalk')

const chalked = chalk`{red Foo} {yellow Bar} {green Baz} {blue Qux} {bgMagentaBright  WOMBAT! }`
console.log(chalked)

const iTerm2Colors = ansiTo.load.iTerm2Colors('./base16-flat-dark-f1lt3r-256.itermcolors')

const html = ansiTo.html(chalked, {colors: iTerm2Colors})
console.log(html)
```

Console Output:

![Figure 02 Console](examples/figure-02-console.png)

Browser Screenshot:

![Figure 02 Browser Screenshot](examples/figure-02-browser.png)



## Install

```
$ yarn add ansi-to
```

