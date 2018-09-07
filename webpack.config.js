const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ['react', 'react-dom'];

const webpackConfig = {
	entry: {
		bundle: './src/index.js',
		vendor: VENDOR_LIBS
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},
  module: {
  	rules: [
  		{
  			test: /\.js$/,
  			use: 'babel-loader',
  			exclude: /node_modules/
  		},
  		{
  			test: /\.css$/,
  			use: ['style-loader', 'css-loader'],
  		}
  	]
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		template: 'src/index.html'
  	}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};

module.exports = webpackConfig;
