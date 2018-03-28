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
			const text = word
			const data = {x, y, text}
			plugin.decorate('text', data)
			x += text.length
			return
		}

		// Send ANSI strings to the decorator
		const ansiTag = types.ansiTags[word]
		const decorator = types.decorators[ansiTag]
		const color = opts.colors[ansiTag]

		const data = {x, y, color}
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
