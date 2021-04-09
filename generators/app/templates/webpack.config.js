/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const Dotenv = require('dotenv')
const packageName = require('./package.json').name

module.exports = (env, argv) => {
  // 使用.env.+mode的方式命名不同的环境变量
  const envName = argv.env
  const mode = argv.mode || 'development'
  const envFile = path.resolve(envName || '.env.' + mode)
  const dotenv = Dotenv.config({
    path: envFile
  })
  const envParsed = dotenv.parsed || {}
  const publicPath = envParsed.PUBLIC_PATH || '/'
  console.log('env 变量:', envParsed)

  return {
    entry: './src/index.tsx',
    mode,
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public/'),
      port: 3000,
      publicPath: 'http://localhost:3000/',
      hotOnly: true,
      historyApiFallback: true,
      overlay: {
        warnings: false,
        errors: true
      },
      // host: '0.0.0.0',
      allowedHosts: ['localhost', 'locala.com', 'localb.com'],
      // 跨域
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: {
        '/json': 'http://localhost:3000'
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            'thread-loader',
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ]

        },
        // {
        //   test: /\.css$/,
        //   use: ['thread-loader', 'style-loader', 'css-loader',
        //     {
        //       loader: 'less-loader', // compiles Less to CSS
        //       options: {
        //         javascriptEnabled: true
        //       }
        //     }]
        // },
        {
          test: /\.(css|less)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
              // options: {
              //   modules: true,
              //   localIdentName: '[local]___[hash:base64:5]'
              // }
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                javascriptEnabled: true
              }
            }
          ]
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
                // publicPath: '../assets/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve('./src')
      }
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: publicPath,
      filename: 'bundle_[hash].js',
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envParsed)
      }),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
}
