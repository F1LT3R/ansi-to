const fs = require('fs')
const chalk = require('chalk')
const ansiTo = require('.')

const colors = ansiTo.load.iTerm2Colors('./colors/base16-flat-dark-f1lt3r-256.itermcolors')
const opts = {colors}

const chalkStylesAnsi = fs.readFileSync('./fixtures/fixture.chalk-styles.ansi').toString()
// const result = ansiTo.image(chalkStylesAnsi, opts)

const ansiText = chalk`Your {red wish} is {bgYellow.black my} {dim com}mand. Ye{bgRed.dim s it i}s!`
console.log(ansiText)
// console.log(JSON.stringify(ansiText))
const result = ansiTo.image(ansiText, opts)


console.log('\u001b]1337;File=inline=1:' + result.substr(22) + '\u0007')
