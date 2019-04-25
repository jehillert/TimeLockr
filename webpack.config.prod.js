const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader/locals'] },
      { test: /\.css$/, use: ['style-loader', {loader: 'css-loader', options: {minimize: true}}, 'less-loader'] }
      { test: /\.png$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/png' } }] },
    ],
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      components: path.resolve(__dirname, 'client/indexes/components.jsx'),
      contexts: path.resolve(__dirname, 'client/indexes/contexts.jsx'),
      theme: path.resolve(__dirname, 'client/indexes/theme.jsx'),
      utilities: path.resolve(__dirname, 'client/indexes/utilities.jsx'),
    },
  },
}


/*

! TO FINISH:
!   https://iamakulov.com/notes/webpack-front-end-size-caching/

CONSIDER ADDING:
  https://github.com/webpack-contrib/mini-css-extract-plugin

POSSIBLY REVERT TO:
  { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },

POSSIBLY NEEDED:
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  new CopyWebpackPlugin([{ from: './static/favicon.ico' }]),
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  rules: [
    { test: /\.jsx?$/, include: /node_modules/, use: ['react-hot-loader/webpack'] },
  ]
  From tutorial (inside outdated "lodaders syntax"):
    { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file'}

NOTES:
- looks like ContextReplacementPlugin needs to be in both dev and production configs. I seem to
  recall it was required to avoid problems with moment.  Also, the following article includes it
  in webpack.common.js:
    https://medium.com/@hpux/webpack-4-in-production-how-make-your-life-easier-4d03e2e5b081
- Apparently webpackDefinePlugin will work in herokuj env (see checked answer):
    https://stackoverflow.com/questions/50319324/deploying-app-to-heroku-doesnt-work-if-used-together-with-defineplugin
- Why DefinePlugin and UglifyJsPlugin kept?
    https://iamakulov.com/notes/webpack-front-end-size-caching/
  Note that tutorial used DefinePlugin this way:
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    )}
- Why DedupePlugin removed:
In webpack 4.3:
  "DedupePlugin has been removed
  webpack.optimize.DedupePlugin isn't needed anymore. Remove it from your configuration."

SEE ALSO:
 - Good info on styling loader chaining: https://github.com/webpack-contrib/less-loader

*/
