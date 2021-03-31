const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const packageName = require('./package.json').name

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // host: '0.0.0.0',
    allowedHosts: ['localhost', 'locala.com', 'localb.com'],
    // 跨域
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/env']
            }
          }
        ]

      },
      {
        test: /\.css$/,
        use: ['thread-loader', 'style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name (file) {
                const env = null // 'development'
                if (env === 'development') {
                  return '[path][name].[ext]'
                }

                return '[hash].[ext]'
              },
              outputPath: 'img'
              // publicPath:'https://abc.com/hehe/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: './',
    filename: 'bundle_[hash].js',
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./build/dll/react.manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      filename: 'index.html'
    }),
    // 在htmlwebpack后插入一个AddAssetHtmlPlugin插件，用于将vendor插入打包后的页面
    new AddAssetHtmlPlugin([
      {
        // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
        filepath: path.resolve(__dirname, './build/dll/*.dll.js'),
        // 文件输出目录
        outputPath: 'vendor',
        // 脚本或链接标记的公共路径
        publicPath: 'vendor',
        hash: false
      }
    ]),
    new webpack.HotModuleReplacementPlugin()

  ]
}
