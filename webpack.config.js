const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "querystring": require.resolve("querystring-es3"),
    },
  },
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
