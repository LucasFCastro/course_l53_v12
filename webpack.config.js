var webpack = require('webpack');
module.exports = {
	devtool: 'source-map',
	entry: './src/js/main.js',
	output: {
		path: __dirname + '/dist/js',
		filename: 'app.bundle.js',
		publicPath: '/dist/js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
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
			loaders: ['style','css','sass']
		}
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
