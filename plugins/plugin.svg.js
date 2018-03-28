const template = {
	outer: '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="400" viewBox="0 0 500 400">{{inner}}</svg>',
	linebreak: '<br>',

	foregroundColorOpen: '<group style="color:{{color}}">',
	foregroundColorClose: '</group>',

	backgroundColorOpen: '<span style="{{background-color:{{color}}">',
	backgroundColorClose: '</span>',

	boldOpen: '<b>',
	boldClose: '</b>',

	dimOpen: '<span style="opacity: 0.75">',
	dimClose: '</span>',

	italicOpen: '<i>',
	italicClose: '</i>',

	underlineOpen: '<span style="text-decoration: underline">',
	underlineClose: '</span>',

	hiddenOpen: '<span style="display: hidden">',
	hiddenClose: '</span>',

	strikethroughOpen: '<strike>',
	strikethroughClose: '</strike>',

	inverseOpen: '',
	inverseClose: '',

	reset: ''
}

const handler = (ansi, opts) => {
	return ansi
}

const plugin = {
	template,
	handler
}

module.exports = ansiTo => ansiTo('html', plugin)
