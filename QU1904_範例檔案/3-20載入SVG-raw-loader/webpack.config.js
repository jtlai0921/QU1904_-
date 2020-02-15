const path = require('path');
const {WebPlugin} = require('web-webpack-plugin');

module.exports = {
  // JS 執行入口檔案
  entry: {
    main: './main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['raw-loader']
      }
    ]
  },
  plugins: [
    new WebPlugin({
      template: 'template.html',
      filename: 'index.html',
      requires: ['main']
    })
  ]
};
