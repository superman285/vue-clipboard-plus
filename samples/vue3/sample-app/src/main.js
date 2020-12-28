import {createApp} from 'vue'
import VueClipboard from 'vue-clipboard-plus'
import App from './App.vue'


const app = createApp(App)

app.use(VueClipboard).mount('#app')
