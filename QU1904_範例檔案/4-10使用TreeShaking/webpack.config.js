const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 針對 Npm 中的第三方模組優先采用 jsnext:main 中指向的 ES6 模組化語法的檔案
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
};
