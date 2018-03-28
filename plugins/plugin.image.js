const decorators = {
	text: ({text}) => text,

	foregroundColorOpen: ({color}) => `<span style="color: ${color}">`,
	foregroundColorClose: '</span>',

	backgroundColorOpen: ({color}) => `<span style="background-color: ${color}">`,
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
	linebreak: '<br>',

	container: ({foregroundColor, backgroundColor, content}) => {
		return `<pre style="color: ${foregroundColor}; background-color: ${backgroundColor}"><code>${content}</code></pre>`
	}
}

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// Draw cat with lime helmet
loadImage('examples/images/lime-cat.jpg').then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70)

  console.log('<img src="' + canvas.toDataURL() + '" />')
})

class Decorator {
	constructor (opts) {
		this.opts = opts
	}

	start () {
		this.content = ''
	}

	decorate (name, data) {
		if (!Reflect.has(decorators, name)) {
			return false
		}

		if (typeof decorators[name] === 'string') {
			this.content += decorators[name]
			return
		}

		this.content += decorators[name](data)
	}

	end () {
		const data = {
			foregroundColor: this.opts.colors.foregroundColor,
			backgroundColor: this.opts.colors.backgroundColor,
			content: this.content
		}

		const output = decorators.container(data)
		const reLink = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*))/g
		const final = output.replace(reLink, '<a style="color: inherit" href="$1">$1</a>')
		return final
	}
}

const plugin = {
	init: opts => {
		return new Decorator(opts)
	}
}

module.exports = ansiTo => ansiTo('html', plugin)
