const html = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app/init.ts',
  devtool: '#source-map',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new html({
      template: './src/index.html'
    })
  ]
};
