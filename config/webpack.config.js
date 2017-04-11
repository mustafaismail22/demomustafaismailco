const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const debug = process.env.NODE_ENV !== 'production'
const rootPath = path.join(__dirname, '..')
const srcPath = path.join(rootPath, 'src')

module.exports = {
  entry: {
    main: path.join(srcPath, 'index.js')
  },
  output: {
    path: path.join(rootPath, 'build'),
    filename: `js/[name]${!debug ? '.[chunkhash:6]' : ''}.js`,
    chunkFilename: 'js/[name].[id].[chunkhash:6].chunk.js',
    publicPath: '/',
    libraryTarget: 'umd',
    pathinfo: debug
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: srcPath
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: srcPath
      },
      {
        exclude: [
          /\.(html|jade|pug)$/,
          /\.(js|jsx)$/,
          /\.(css|scss|sass)$/,
          /\.json$/
        ],
        loader: 'file-loader',
        options: {
          name: 'static/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(jade|pug)$/,
        loader: 'pug-loader?pretty=\t'
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: debug ? '[name]__[local]___[hash:base64:6]' : '[hash:base64:6]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9'
                    ]
                  })
                ]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.pug'),
      inject: false
    }),
    new ExtractTextPlugin({
      filename: `css/[name]${!debug ? '.[chunkhash:6]' : ''}.css`,
      allChunks: true
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      files: [
        './build/css/*.*',
        './build/static/*.*'
      ],
      injectChanges: true,
      server: {
        baseDir: 'build',
        directory: false
      }
    }, { reload: false })
  ],
  devtool: debug ? 'cheap-module-source-map' : 'source-map',
  bail: !debug
}
