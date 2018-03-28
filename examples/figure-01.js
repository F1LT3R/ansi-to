const ansiTo = require('../.')
const chalk = require('chalk')

const chalked = chalk`{red Foo} {yellow Bar} {green Baz} {blue Qux} {bgMagentaBright  WOMBAT! }`
console.log(chalked)

const html = ansiTo.html(chalked)
console.log(html)
