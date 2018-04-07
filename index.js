const path = require('path')

const deepMerge = require('deepmerge')
const itermcolorsToHex = require('itermcolors-to-hex')
const parseAnsi = require('parse-ansi')

const defaultColors = require('./colors/ansi-tag-html-colors-as-hex.json')
const iTerm2ColorsNames = require('./ansi-tags-to-iterm2-color-names')

const optsDefault = {
	colors: defaultColors
}

const iTerm2Colors = plistFile => {
	const colorMap = {}
	const iTermHexColors = itermcolorsToHex(plistFile)
	Object.entries(iTerm2ColorsNames).forEach(([ansiTag, iTerm2Tag]) => {
		colorMap[ansiTag] = iTermHexColors[iTerm2Tag]
	})
	return colorMap
}

const parseOpts = $opts => {
	if (typeof $opts.colors === 'string') {
		const colorFile = path.parse($opts.colors)
		if (colorFile.ext === '.itermcolors') {
			const colorMap = iTerm2Colors($opts.colors)
			$opts.colors = colorMap
		}
	}

	return $opts
}

const mergeOpts = (pluginOpts, userOpts) => {
	let $opts = optsDefault

	if (pluginOpts) {
		$opts = deepMerge(optsDefault, pluginOpts)
	}

	if (userOpts) {
		$opts = deepMerge($opts, userOpts)
	}

	return parseOpts($opts)
}

const activePlugins = {}

const plugin = pluginModule => {
	activePlugins[pluginModule.name] = pluginModule.name

	const wrappedHandler = (ansi, userOpts) => {
		const $opts = mergeOpts(pluginModule.opts, userOpts)
		const parsed = parseAnsi(ansi)
		return pluginModule.handler(parsed, $opts)
	}

	return wrappedHandler
}

const load = {
	iTerm2Colors
}

module.exports = {load, plugin}
