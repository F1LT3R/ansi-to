const deepMerge = require('deepmerge')
const arrayUniq = require('array-uniq')
const ansiRegex = require('ansi-regex')
const superSplit = require('super-split')
const itermcolorsToHex = require('itermcolors-to-hex')

const types = require('./types')
const plugins = require('./plugins')
const colors = require('./colors/colors.html-names')

// Atomize
// Splits text into "words" by sticky delimiters [ANSI Escape Seq, \n]
// Eg: words = ['\u001b[37m', 'Line 1', '\n', 'Line 2', '\u001b[39m']
const atomize = text => {
	const ansies = arrayUniq(text.match(ansiRegex()))
	const words = superSplit(text, ansies.concat(['\n']))
	return {ansies, words}
}

const parse = (ansi, plugin, opts) => {
	const {ansies, words} = atomize(ansi)

	const stack = {
		fgCol: [],
		bgCol: [],
		boldDim: [],
		italic: false,
		underline: false,
		inverse: false,
		hidden: false,
		strikethrough: false
	}

	const state = {
		fgCol: () => {
			if (stack.fgCol.length > 0) {
				return stack.fgCol[stack.fgCol.length - 1]
			}
			return opts.colors.foregroundColor
		},
		bgCol: () => {
			if (stack.bgCol.length > 0) {
				return stack.bgCol[stack.bgCol.length - 1]
			}
			return 'rgba(0, 0, 0, 0)'
		}
	}

	let x = 0
	let y = 0

	plugin.start()

	words.forEach(word => {
		// Send newline characters to the decorator
		if (word === '\n') {
			const data = {x, y}
			plugin.decorate('linebreak', data)
			x = 0
			y += 1
			return
		}

		// Send normal (non-ANSI) strings to the decorator
		if (ansies.includes(word) === false) {
			const data = {text: word, x, y, state, stack}
			plugin.decorate('text', data)
			x += word.length
			return
		}

		// Send ANSI strings to the decorator
		const ansiTag = types.ansiTags[word]
		const decorator = types.decorators[ansiTag]
		const color = opts.colors[ansiTag]

		if (decorator === 'foregroundColorOpen') {
			stack.fgCol.push(color)
		}

		if (decorator === 'foregroundColorClose') {
			stack.fgCol.pop()
		}

		if (decorator === 'backgroundColorOpen') {
			stack.bgCol.push(color)
		}

		if (decorator === 'backgroundColorClose') {
			stack.bgCol.pop()
		}

		if (decorator === 'boldOpen') {
			stack.boldDim.push('bold')
		}

		if (decorator === 'dimOpen') {
			stack.boldDim.push('dim')
		}

		if (decorator === 'boldDimClose') {
			stack.boldDim.pop()
		}

		if (decorator === 'italicOpen') {
			stack.italic = true
		}

		if (decorator === 'italicClose') {
			stack.italic = false
		}

		if (decorator === 'underlineOpen') {
			stack.underline = true
		}

		if (decorator === 'underlineClose') {
			stack.underline = false
		}

		if (decorator === 'inverseOpen') {
			stack.inverse = true
		}

		if (decorator === 'inverseClose') {
			stack.inverse = false
		}

		if (decorator === 'strikethroughOpen') {
			stack.strikethrough = true
		}

		if (decorator === 'strikethroughClose') {
			stack.strikethrough = false
		}

		const data = {x, y, color, ansiTag}

		plugin.decorate(decorator, data)
	})

	return plugin.end()
}

const optsDefault = {
	colors
}

const optify = opts => {
	let $opts = optsDefault

	if (opts) {
		$opts = deepMerge(optsDefault, opts)
	}

	return $opts
}

const activePlugins = {}

const plugin = (name, plugin) => {
	activePlugins[name] = plugin

	const wrappedHandler = (ansi, opts) => {
		const $opts = optify(opts)
		const pluginInstance = plugin.init($opts)
		return parse(ansi, pluginInstance, $opts)
	}

	return wrappedHandler
}

const iTerm2Colors = plistFile => {
	const colorMap = {}
	const iTermHexColors = itermcolorsToHex(plistFile)
	Object.entries(types.iTerm2Colors).forEach(([ansiTag, iTerm2Tag]) => {
		colorMap[ansiTag] = iTermHexColors[iTerm2Tag]
	})
	return colorMap
}

const load = {
	plugin,
	iTerm2Colors
}

module.exports = {load}

Object.entries(plugins).forEach(([name, fn]) => {
	if (Reflect.has(module.exports, name)) {
		const msg = `ansiTo: A plugin named: ${name} was already loaded.`
		throw new Error(msg)
	}

	module.exports[name] = fn(load.plugin)
})
