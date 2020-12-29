# vue-clipboard-plus

A simple Vuejs2 and Vuejs3 binding for clipboard.js, based on **vue-clipboard2**. That's awsome!✨

Thanks to <a href="https://github.com/Inndy/vue-clipboard2">Inndy/vue-clipboard2</a> for inspiration! ❤️❤️

# About
You can use it as vue-clipboard2 like, and you can also use it with Vue3 new Composition API! I will show you the demos.

## Install

`npm install --save vue-clipboard-plus` or use `dist/cdnlink-vue-clipboard-plus.min.js` with script tag in html

## Usage

For Vue2, it's usage is the same as [vue-clipboard2](https://github.com/Inndy/vue-clipboard2), https://github.com/Inndy/vue-clipboard2

For Vue3, it's a little bit difference

For vue-cli user:

```javascript
# For Vue2
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

# For Vue3
import {createApp} from 'vue'
import VueClipboard from 'vue-clipboard-plus'
import App from './App.vue'

const app = createApp(App)
app.use(VueClipboard).mount('#app')

```

For standalone usage:

```html
<!-- Vue2 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-clipboard-plus@1.0.6/dist/cdnlink-vue-clipboard-plus.min.js"></script>

<!-- Vue3 -->
<script src="https://unpkg.com/vue@next"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-clipboard-plus@1.0.6/dist/cdnlink-vue-clipboard-plus.min.js"></script>
```



## It doesn't work with bootstrap modals

See [clipboardjs](https://clipboardjs.com/#advanced-usage) document and [this pull request](https://github.com/Inndy/vue-clipboard2/pull/23), `container` option is available like this:

```js
// For Vue2
let container = this.$refs.container
this.$copyText("Text to copy", container)

// For Vue3
const {getCurrentInstance} = Vue

// inside setup function
const {ctx:_this} = getCurrentInstance()
let container = _this.$refs.container
_this.$copyText("Text to copy", container)
```

Or you can let `vue-clipboard2` set `container` to current element by doing this:

```js
// For Vue2
import Vue from 'vue'
import VueClipboard from 'vue-clipboard-plus'

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

// For Vue3
import {createApp} from 'vue'
import VueClipboard from 'vue-clipboard-plus'
import App from './App.vue'

VueClipboard.config.autoSetContainer = true // add this line

const app = createApp(App)
app.use(VueClipboard).mount('#app')
```



## Sample

```html
<!-- For Vue2 -->

<div id="app"></div>
<template id="t">
  <div class="container">
    <input type="text" v-model="message">
    <button type="button"
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy!</button>
  </div>
</template>

<script>
new Vue({
  el: '#app',
  template: '#t',
  data: function () {
    return {
      message: 'Copy These Text'
    }
  },
  methods: {
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  }
})
</script>

<!-- For Vue3 -->
<div id="app"></div>

<template id="t">
	<div class="container">
		<input type="text" v-model="message">
		<button type="button"
		        v-clipboard:copy="message"
		        v-clipboard:success="done">Copy!</button>
	</div>
</template>

<script>
const {createApp, ref} = Vue

const app = createApp({
	template: '#t',
	setup() {
		const message = ref('Copy These Text📚')
		const done = function() {
			alert('Copied!')
		}
		return {
			message,
			done
		}
	}
})

app.use(VueClipboard).mount('#app')
</script>
```

## Sample 2

```html
<!-- For Vue2 -->
<div id="app"></div>

  <template id="t">
    <div class="container">
    <input type="text" v-model="message">
    <button type="button" @click="doCopy">Copy!</button>
    </div>
  </template>

  <script>
  new Vue({
    el: '#app',
    template: '#t',
    data: function () {
      return {
        message: 'Copy These Text'
      }
    },
    methods: {
      doCopy: function () {
        this.$copyText(this.message).then(function (e) {
          alert('Copied')
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
      }
    }
  })
  </script>

<!-- For Vue3 -->
<div id="app"></div>

<template id="t">
	<div class="container">
		<input type="text" v-model="message">
		<button type="button" @click="doCopy">Copy!</button>
	</div>
</template>

<script>
const {createApp, ref, getCurrentInstance} = Vue

const app = createApp({
	template: '#t',
	setup() {
		const {ctx} = getCurrentInstance()

		const message = ref('Copy These Text📚')
		const doCopy = (function () {
			this.$copyText(this.message).then(function (e) {
				alert('Copied')
				console.log(e)
			}, function (e) {
				alert('Can not copy')
				console.log(e)
			})
		}).bind(ctx)

		return {
			message,
			doCopy
		}
	}
})

app.use(VueClipboard).mount('#app')
</script>
```



**For more samples, you can find them on [/samples/](/samples/)**



### Contribution

PRs welcome, and issues as well! If you want any feature that we don't have currently,
please fire an issue for a feature request.

