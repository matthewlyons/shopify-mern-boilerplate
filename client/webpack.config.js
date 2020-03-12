const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const sourceMap = isDevelopment;
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  target: 'webworker',
  devtool: 'eval',
  entry: [
    '@shopify/polaris/styles.css',
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../assets'),
    publicPath: '/assets/',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => autoprefixer(),
              sourceMap
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './node_modules/@shopify/polaris'),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              sourceMap,
              modules: true,
              importLoaders: 1
            }
          }
        ]
      }
    ]
  }
};
