var webpack = require('webpack');

module.export = {
	// 入口
	entry: {
		app: __dirname + ''
	},

	//出口
	output: {
		path: __dirname + '',
		filename: 'bundle.js'
	},

	//source-map
	devtool: 'cheap-module-eval-source-map',


	//模块
	module: {
		loaders: [
			{
				test: /\.js$/,
        		loader: 'babel'
			},
			{
				test: /\.css$/,
        		loader: 'style!css'
			},
			{
				test: /\.string$/,
        		loader: 'string'
			},

			{
				test: /\.vue$/,
        		loader: 'vue'
			}
		]
	},

	//vue
	vue:{
	    loaders:{
	      js:'babel'
	    }
	}
}