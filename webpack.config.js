var ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    client: './src/client.js',
    bundle: './src/bundle.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets/'),
    filename: "[name].js",
    publicPath: './assets/',
  },
  devServer: {
    contentBase: 'assets',
    watchContentBase: true,
    compress: true,
    hot: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(otf|png|jpg|jpeg|gif|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename:'styles.css'
    })
  ]
}
