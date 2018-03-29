const ansiTo = require('../.')
const chalk = require('chalk')

const chalked = chalk`{red Foo} {yellow Bar} \n{green Baz} {blue Qux} {bgMagentaBright  WOMBAT! }`
console.log(chalked)

const iTerm2Colors = ansiTo.load.iTerm2Colors('../colors/base16-flat-dark-f1lt3r-256.itermcolors')

const svg = ansiTo.svg(chalked, {colors: iTerm2Colors})
console.log(svg)
