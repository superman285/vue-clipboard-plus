const Clipboard =require('../lib/clipboard.min.js')

const VueClipboardConfig = {
	autoSetContainer: false,
	appendToBody: true
}

const versionMapping = app => ({
	vue2: {
		global: app.prototype,
		bind: 'bind',
		update: 'update',
		unbind: 'unbind'
	},
	vue3: {
		global: app.config.globalProperties,
		bind: 'beforeMount',
		update: 'updated',
		unbind: 'unmounted'
	}
})

const VueClipboard = {
	install:  (app, options = VueClipboardConfig) => {

		const VUE_VERSION = 'vue' + app.version.slice(0,1)

		versionMapping(app)[VUE_VERSION].global.$clipboardConfig = options
		versionMapping(app)[VUE_VERSION].global.$copyText = function (text, container) {
			return new Promise(function (resolve, reject) {
				var fakeElement = document.createElement('button')
				var clipboard = new Clipboard(fakeElement, {
					text: function () { return text },
					action: function () { return 'copy' },
					container: typeof container === 'object' ? container : document.body
				})
				clipboard.on('success', function (e) {
					clipboard.destroy()
					resolve(e)
				})
				clipboard.on('error', function (e) {
					clipboard.destroy()
					reject(e)
				})
				if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement)
				fakeElement.click()
				if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement)
			})
		}

		app.directive('clipboard', {
			[versionMapping(app)[VUE_VERSION].bind]: function (el, binding) {
				if (binding.arg === 'success') {
					el._vClipboard_success = binding.value
				} else if (binding.arg === 'error') {
					el._vClipboard_error = binding.value
				} else {
					var clipboard = new Clipboard(el, {
						text: function () { return binding.value },
						action: function () { return binding.arg === 'cut' ? 'cut' : 'copy' },
						container: options.autoSetContainer ? el : undefined
					})
					clipboard.on('success', function (e) {
						var callback = el._vClipboard_success
						callback && callback(e)
					})
					clipboard.on('error', function (e) {
						var callback = el._vClipboard_error
						callback && callback(e)
					})
					el._vClipboard = clipboard
				}
			},
			[versionMapping(app)[VUE_VERSION].update]: function (el, binding) {
				if (binding.arg === 'success') {
					el._vClipboard_success = binding.value
				} else if (binding.arg === 'error') {
					el._vClipboard_error = binding.value
				} else {
					el._vClipboard.text = function () { return binding.value }
					el._vClipboard.action = function () { return binding.arg === 'cut' ? 'cut' : 'copy' }
				}
			},
			[versionMapping(app)[VUE_VERSION].unbind]: function (el, binding) {
				if (binding.arg === 'success') {
					delete el._vClipboard_success
				} else if (binding.arg === 'error') {
					delete el._vClipboard_error
				} else {
					el._vClipboard.destroy()
					delete el._vClipboard
				}
			}
		})
	},
	config: VueClipboardConfig
}

module.exports = VueClipboard
