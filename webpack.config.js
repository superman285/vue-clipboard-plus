
module.exports = {
	entry: {
		'vue-clipboard-plus': './src/vue-clipboard-plus.js',
		'cdnlink-vue-clipboard-plus': './src/cdnlink-vue-clipboard-plus.js'
	},
	mode: 'production',
	output: {
		filename: '[name].min.js'
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
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
