var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('../css/app.css');

module.exports = {
	devtool: 'source-map',
	entry: './src/js/main.js',
	output: {
		path: __dirname + '/dist/js',
		filename: 'app.bundle.js',
		publicPath: '/dist/js/'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'window.$' : 'jquery',
			'window.jQuery' : 'jquery'
		}),
		new webpack.HotModuleReplacementPlugin(),
		extractCSS
	],
	module: {
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel',
	      query: {
	        presets: ['es2015']
			}
	    },
		{
			test: /\.(woff|woff2|ttf|svg|eot|)$/,
			loader: 'url?limit=100000'
		},
		{
			test: /\.scss$/,
			loader: extractCSS.extract(['css','sass'])
		},
	  ]
  },
  devServer: {
	  inline: true,
	  port: 8081,
	  watchOptions: {
		  poll: true,
		  aggregateTimeout: 300
	  }
  }
};
