import Vue from 'vue'
import VueClipboard from 'vue-clipboard-plus'
import App from './App.vue'

Vue.use(VueClipboard)

new Vue({
	el: '#app',
	render: h => h(App)
})
