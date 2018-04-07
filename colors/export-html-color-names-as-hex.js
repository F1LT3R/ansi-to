const fs = require('fs')
const path = require('path')

const htmlColors = require('html-colors')

const ansiHtmlColorTable = {
	black: 'Black',
	red: 'FireBrick',
	green: 'LimeGreen',
	yellow: 'GoldenRod',
	blue: 'RoyalBlue',
	magenta: 'DarkOrchid',
	cyan: 'DarkCyan',
	white: 'LightGray',

	gray: 'DarkGrey',
	redBright: 'OrangeRed',
	greenBright: 'GreenYellow',
	yellowBright: 'Yellow',
	blueBright: 'SkyBlue',
	magentaBright: 'Magenta',
	cyanBright: 'Cyan',
	whiteBright: 'White',

	bgBlack: 'Black',
	bgRed: 'FireBrick',
	bgGreen: 'LimeGreen',
	bgYellow: 'GoldenRod',
	bgBlue: 'RoyalBlue',
	bgMagenta: 'DarkOrchid',
	bgCyan: 'DarkCyan',
	bgWhite: 'LightGray',

	bgGray: 'DarkGray',
	bgRedBright: 'Red',
	bgGreenBright: 'GreenYellow',
	bgYellowBright: 'Yellow',
	bgBlueBright: 'SkyBlue',
	bgMagentaBright: 'Magenta',
	bgCyanBright: 'Cyan',
	bgWhiteBright: 'White',

	backgroundColor: 'Black',
	foregroundColor: 'LightGray'
}

const colorMap = {}

Object.entries(ansiHtmlColorTable).forEach(([ansiTag, htmlColorName]) => {
	colorMap[ansiTag] = htmlColors.hex(htmlColorName.toLowerCase())
})

const outfile = 'ansi-tag-html-colors-as-hex.json'
const outfilePath = path.join(__dirname, outfile)
fs.writeFileSync(outfilePath, JSON.stringify(colorMap, null, 4))
