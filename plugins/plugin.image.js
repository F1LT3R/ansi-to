const canvas = require('canvas')

class Decorator {
	constructor (opts) {
		this.opts = opts
	}

	start () {
		this.content = ''
		this.canvas = canvas.createCanvas(2440, 180)
		this.ctx = this.canvas.getContext('2d')
		this.ctx.antialias = 'subpixel'
		this.fontSize = 15

		// Restore later
		// this.ctx.fillStyle = this.opts.colors.backgroundColor
		this.ctx.fillStyle = 'rgba(0,0,0,0.75)'

		this.font = {
			regular: `${this.fontSize}px Courier`,
			bold: `bold ${this.fontSize}px Courier`,
			italic: `italic ${this.fontSize}px Courier`,
			boldItalic: `bold italic ${this.fontSize}px Courier`
		}

		this.ctx.font = this.font.regular

		this.textWidth = Math.round(this.ctx.measureText('W').width)
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.translate(0, this.fontSize * 2)
		this.ctx.scale(2, 2)
	}

	decorate (name, data) {
		if (name !== 'text') {
			return
		}

		const x = data.x * this.textWidth
		const y = data.y + (this.fontSize * data.y)
		const w = this.textWidth * data.text.length

		if (data.stack.boldDim.includes('bold')) {
			this.ctx.font = this.font.bold
		} else {
			this.ctx.font = this.font.regular
		}

		if (data.stack.italic) {
			this.ctx.font = this.font.italic
		}

		if (data.stack.italic && data.stack.boldDim.includes('bold')) {
			this.ctx.font = this.font.boldItalic
		}

		this.ctx.fillStyle = data.state.bgCol()
		this.ctx.fillRect(x, y - (this.fontSize * 0.8), w, this.fontSize + 1)

		if (data.stack.boldDim.includes('dim')) {
			this.ctx.globalAlpha = 0.5
		} else {
			this.ctx.globalAlpha = 1
		}

		this.ctx.fillStyle = data.state.fgCol()
		this.ctx.fillText(data.text, x, y)

		this.ctx.strokeStyle = this.ctx.fillStyle

		const underlineOffset = y + (this.fontSize * 0.2)

		if (data.stack.underline) {
			this.ctx.beginPath()
			this.ctx.moveTo(x, y + underlineOffset)
			this.ctx.lineTo(x + w, y + underlineOffset)
			this.ctx.closePath()
			this.ctx.stroke()
		}

		const strikethroughOffset = y - (this.fontSize * 0.3)

		if (data.stack.strikethrough) {
			this.ctx.beginPath()
			this.ctx.moveTo(x, y + strikethroughOffset)
			this.ctx.lineTo(x + w, y + strikethroughOffset)
			this.ctx.closePath()
			this.ctx.stroke()
		}
	}

	end () {
		return this.canvas.toDataURL()
	}
}

const plugin = {
	init: opts => {
		return new Decorator(opts)
	}
}

module.exports = ansiTo => ansiTo('image', plugin)
