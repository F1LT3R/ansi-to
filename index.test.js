import test from 'ava'

import ansiTo from '.'

const defaultColors = require('./colors/ansi-tag-html-colors-as-hex.json')

test('Plugin can load, override opts, and get ansi chunks', t => {
	const MyPlugin = {
		name: 'myplugin',
		handler: (ansi, opts) => {
			return {ansi, opts}
		},
		opts: {
			myOpt1: 1337,
			myOpt2: 'foo'
		}
	}

	const handler = ansiTo.plugin(MyPlugin)
	t.is(typeof handler, 'function')

	const result = handler('abcd', {myOpt2: 'bar'})
	t.deepEqual(result, {
		ansi: {
			raw: 'abcd',
			textArea: {columns: 4, rows: 1},
			plainText: 'abcd',
			chunks: [{
				type: 'text',
				value: 'abcd',
				position: {x: 0, y: 0, n: 0, raw: 0},
				style: {}
			}]
		},
		opts: {
			myOpt1: 1337,
			myOpt2: 'bar',
			colors: defaultColors
		}
	})
})

test('Loads iTerm2Colors', t => {
	const colors = ansiTo.load.iTerm2Colors('./colors/base16-flat-dark-f1lt3r-256.itermcolors')
	t.deepEqual(colors, {
		black: '#2c3e50',
		red: '#ce4435',
		green: '#2ecc71',
		yellow: '#e9bd0e',
		blue: '#318fce',
		magenta: '#9b59b6',
		cyan: '#1abc9c',
		white: '#e0e0e0',
		gray: '#758283',
		blackBright: '#758283',
		redBright: '#ff5342',
		greenBright: '#39ff8d',
		yellowBright: '#fedb00',
		blueBright: '#0098ff',
		magentaBright: '#e500ff',
		cyanBright: '#00ffcc',
		whiteBright: '#f9fdff',
		bgBlack: '#2c3e50',
		bgRed: '#ce4435',
		bgGreen: '#2ecc71',
		bgYellow: '#e9bd0e',
		bgBlue: '#318fce',
		bgMagenta: '#9b59b6',
		bgCyan: '#1abc9c',
		bgWhite: '#e0e0e0',
		bgGray: '#758283',
		bgBlackBright: '#758283',
		bgRedBright: '#ff5342',
		bgGreenBright: '#39ff8d',
		bgYellowBright: '#fedb00',
		bgBlueBright: '#0098ff',
		bgMagentaBright: '#e500ff',
		bgCyanBright: '#00ffcc',
		bgWhiteBright: '#f9fdff',
		backgroundColor: '#2c3e50',
		foregroundColor: '#e0e0e0'
	})
})

test('Can load color string', t => {
	const colors = ansiTo.load.iTerm2Colors('./colors/base16-flat-dark-f1lt3r-256.itermcolors')
	t.deepEqual(colors, {
		black: '#2c3e50',
		red: '#ce4435',
		green: '#2ecc71',
		yellow: '#e9bd0e',
		blue: '#318fce',
		magenta: '#9b59b6',
		cyan: '#1abc9c',
		white: '#e0e0e0',
		gray: '#758283',
		blackBright: '#758283',
		redBright: '#ff5342',
		greenBright: '#39ff8d',
		yellowBright: '#fedb00',
		blueBright: '#0098ff',
		magentaBright: '#e500ff',
		cyanBright: '#00ffcc',
		whiteBright: '#f9fdff',
		bgBlack: '#2c3e50',
		bgRed: '#ce4435',
		bgGreen: '#2ecc71',
		bgYellow: '#e9bd0e',
		bgBlue: '#318fce',
		bgMagenta: '#9b59b6',
		bgCyan: '#1abc9c',
		bgWhite: '#e0e0e0',
		bgGray: '#758283',
		bgBlackBright: '#758283',
		bgRedBright: '#ff5342',
		bgGreenBright: '#39ff8d',
		bgYellowBright: '#fedb00',
		bgBlueBright: '#0098ff',
		bgMagentaBright: '#e500ff',
		bgCyanBright: '#00ffcc',
		bgWhiteBright: '#f9fdff',
		backgroundColor: '#2c3e50',
		foregroundColor: '#e0e0e0'
	})
})
