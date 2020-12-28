var VueClipboard = require('./vue-clipboard-plus.js')

window.VueClipboard = VueClipboard

if (window.Vue) {
	const VUE_VERSION = 'vue' + Vue.version.slice(0,1)

	if(VUE_VERSION === 'vue2') {
		Vue.use(VueClipboard)
	}
}
