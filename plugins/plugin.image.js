const canvas = require('canvas')

// Returns: size {
//     width: 8.4013671875,
//     actualBoundingBoxLeft: 0,
//     actualBoundingBoxRight: 8.4013671875,
//     actualBoundingBoxAscent: 8.107421875,
//     actualBoundingBoxDescent: 0,
//     emHeightAscent: 10.5546875,
//     emHeightDescent: 3.4453125,
//     alphabeticBaseline: -0
// }

const meassureFontChar = font => {
	const _canvas = canvas.createCanvas(0, 0)
	const _ctx = _canvas.getContext('2d')
	_ctx.font = font.bold
	const size = _ctx.measureText('M')
	return size
}

const handler = (ansi, opts) => {
	const {
		fontSize,
		fontFace,
		scale
	} = opts

	const font = {
		regular: `${fontSize}px ${fontFace}`,
		bold: `bold ${fontSize}px ${fontFace}`,
		italic: `italic ${fontSize}px ${fontFace}`,
		boldItalic: `bold italic ${fontSize}px ${fontFace}`
	}

	const size = meassureFontChar(font)

	font.size = size
	font.width = size.width
	font.height = size.emHeightAscent + size.emHeightDescent

	const textArea = ansi.textArea
	const textAreaWidth = textArea.columns * font.width
	const textAreaHeight = textArea.rows * font.height

	const width = opts.paddingLeft + textAreaWidth + opts.paddingRight
	const height = opts.paddingTop + textAreaHeight + opts.paddingBottom
	const totalWidth = width * scale
	const totalHeight = height * scale

	const _canvas = canvas.createCanvas(totalWidth, totalHeight)
	const ctx = _canvas.getContext('2d')
	ctx.fillStyle = opts.colors.backgroundColor
	ctx.fillRect(0, 0, _canvas.width, _canvas.height)
	ctx.scale(scale, scale)

	// Offset the position by font size and padding
	// font.size.emHeightDescent
	const offsetTop = opts.paddingTop +
		font.size.emHeightAscent

	const offsetLeft = opts.paddingLeft
	ctx.translate(offsetLeft, offsetTop)

	ansi.chunks.forEach(chunk => {
		const {
			type,
			value,
			position,
			style
		} = chunk

		if (type !== 'text') {
			return
		}

		const x = position.x * font.width
		const y = position.y + (font.height * position.y)
		const w = font.width * value.length

		if (style.bold) {
			ctx.font = font.bold
		} else {
			ctx.font = font.regular
		}

		if (style.italic) {
			ctx.font = font.italic
		}

		if (style.italic && style.bold) {
			ctx.font = font.boldItalic
		}

		if (style.dim) {
			ctx.globalAlpha = 0.5
		} else {
			ctx.globalAlpha = 1
		}

		if (style.backgroundColor) {
			ctx.fillStyle = opts.colors[style.backgroundColor]
			ctx.fillRect(x, y - (font.height * 0.8), w, font.height + 1)
		}

		if (style.backgroundColor) {
			ctx.fillStyle = opts.colors[style.backgroundColor]
			ctx.fillRect(x, y - (font.height * 0.8), w, font.height + 1)
		}

		ctx.fillStyle = opts.colors.foregroundColor

		if (style.foregroundColor) {
			ctx.fillStyle = opts.colors[style.foregroundColor]
		}

		ctx.fillText(value, x, y)

		ctx.strokeStyle = ctx.fillStyle

		if (style.underline) {
			const underlineOffset = y + (font.height * 0.2)
			ctx.beginPath()
			ctx.moveTo(x, y + underlineOffset)
			ctx.lineTo(x + w, y + underlineOffset)
			ctx.closePath()
			ctx.stroke()
		}

		if (style.strikethrough) {
			const strikethroughOffset = y - (font.height * 0.3)
			ctx.beginPath()
			ctx.moveTo(x, y + strikethroughOffset)
			ctx.lineTo(x + w, y + strikethroughOffset)
			ctx.closePath()
			ctx.stroke()
		}
	})

	const data = _canvas.toDataURL()
	return data
}

const Plugin = {
	name: 'image',
	handler,
	opts: {
		// FontSize: px
		fontSize: 14,

		// FontFace: (use monospace fonts only)
		fontFace: 'Courier',

		// Assume we would like a Retina-ready image
		scale: 1,

		// Padding: px
		paddingTop: 0,
		paddingLeft: 0,
		paddingBottom: 0,
		paddingRight: 0
	}
}

module.exports = ansiTo => ansiTo(Plugin)
