import test from 'ava'
import is from '@sindresorhus/is'

import imagePluginModule from './plugin.image'

// Always include this test at the top of your `ansi-to` plugin tests
test('plugin constructor returns plugin name and instantiable plugin class', t => {
	t.true(is.object(imagePluginModule))

	const constructorWrapper = plugin => {
		t.is(plugin.name, 'image')
		t.true(is.class(plugin.Class))
		const instance = new plugin.Class()
		t.true(is.object(instance))
		t.true(is.directInstanceOf(new plugin.Class(), plugin.Class))
		t.true(Reflect.has(instance, 'start'))
		t.true(is.function(instance.start))
		t.true(is.function(instance.chunk))
		t.true(is.function(instance.end))
	}

	imagePluginModule(constructorWrapper)
})

test('meassureFontChar() can get char dimensions', t => {
	imagePluginModule(plugin => {
		const instance = new plugin.Class()
		const fontFace = 'bold 14px Courier'
		const charSize = instance.meassureFontChar(fontFace)
		t.is(charSize.width, 9.4384765625)
		t.is(charSize.emHeightAscent, 7.7001953125)
		t.is(charSize.emHeightDescent, 2.2998046875)
	})
})

test('meassureTextArea() can get text area columns rows size', t => {
	imagePluginModule(plugin => {
		const instance = new plugin.Class()
		const str = 'Hello,\nWorld!'
		const textArea = instance.meassureTextArea(str)
		t.is(textArea.columns, 6)
		t.is(textArea.rows, 2)
	})
})

test('getCanvasSize() can get dimensions from char-size and padding', t => {
	imagePluginModule(plugin => {
		const opts = {
			fontSize: 14,
			fontFace: 'Courier',
			paddingTop: 0,
			paddingLeft: 0,
			paddingBottom: 0,
			paddingRight: 0
		}
		const instance = new plugin.Class(opts)
		instance.setFont(opts.fontSize, opts.fontFace)
		const fontFace = instance.font.bold
		const charSize = instance.meassureFontChar(fontFace)
		instance.setCharSize(charSize)
		const str = 'Hello,\nWorld!'
		const textArea = instance.meassureTextArea(str)
		const canvasSize = instance.getCanvasSize(textArea)
		t.is(canvasSize.width.toFixed(2), '56.63')
		t.is(canvasSize.height.toFixed(2), '20.00')
	})
})
