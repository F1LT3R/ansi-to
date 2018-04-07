const decorators = {
	text: text => text,

	foregroundColorOpen: color =>
		`<span style="color: ${color}">`,
	foregroundColorClose: '</span>',

	backgroundColorOpen: color =>
		`<span style="background-color: ${color}">`,
	backgroundColorClose: '</span>',

	boldOpen: '<span style="font-weight: bold">',
	dimOpen: '<span style="opacity: 0.5">',
	boldDimClose: '</span>',

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

	reset: '',
	newline: '<br>',

	container: (content, opts) => {
		return `<pre style="color: ${opts.colors.foregroundColor}; background-color: ${opts.colors.backgroundColor}"><code>${content}</code></pre>`
	}
}

const handler = (ansi, opts) => {
	let content = ''

	ansi.chunks.forEach(chunk => {
		if (chunk.type === 'ansi') {
			const {
				tag,
				decorator
			} = chunk.value

			const dec = decorators[decorator]

			if (typeof dec === 'string') {
				content += dec
				return
			}

			content += dec(opts.colors[tag])
			return
		}

		if (chunk.type === 'text') {
			content += decorators.text(chunk.value)
			return
		}

		if (chunk.type === 'newline') {
			content += decorators.newline
		}
	})

	const output = decorators.container(content, opts)
	const reLink = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*))/g
	const final = output.replace(reLink, '<a style="color: inherit" href="$1">$1</a>')
	return final
}

const Plugin = {
	name: 'html',
	handler
}

module.exports = ansiTo => ansiTo(Plugin)
