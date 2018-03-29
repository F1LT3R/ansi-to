const ansiTo = require('.')
const chalk = require('chalk')
const termImg = require('term-img')

function fallback() {
	console.log('Do something else when not supported')
}


const ansiText = chalk`Your {red wish} is {yellow my} command.`
// console.log(JSON.stringify(ansiText))
const result = ansiTo.image(ansiText)
// console.log(result)

process.stdout.write('\u001B]1337;File=inline=1:' + result.substr(22) + '\u0007')
// process.stdout.write(result.substr(22))
// termImg(result, {fallback})
// console.log(result)

