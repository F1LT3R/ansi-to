const decorators = {
	text: ({text, x, y}) => {
		return `<text x="${x * 12}" y="${y}" font-family="Courier" font-size="12px">${text}</text>\n`
	},

	foregroundColorOpen: ({color}) => `<g style="fill: ${color}">\n`,
	foregroundColorClose: `</g>\n`,

	container: ({foregroundColor, content}) => {
		const containerTemplate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 40"><g fill="${foregroundColor}">${content}</g></svg>`
		return containerTemplate
	}
}

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
		return output
	}
}

const plugin = {
	init: opts => {
		return new Decorator(opts)
	}
}

module.exports = ansiTo => ansiTo('svg', plugin)
