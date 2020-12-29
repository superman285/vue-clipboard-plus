
module.exports = {
	mode: 'production',
	entry: {
		'vue-clipboard-plus': './src/vue-clipboard-plus.js',
		'cdnlink-vue-clipboard-plus': './src/cdnlink-vue-clipboard-plus.js'
	},
	output: {
		filename: '[name].min.js',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				// exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}
