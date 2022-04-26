const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'scripts/[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(css|s[cs]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name][contenthash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public', 'index.html'),
      filename: 'index.html',
      title: 'INTERN-STUDY',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css',
    }),
    new ESLintPlugin({
      // 运行的时候自动帮你修复错误
      fix: true,
    }),
    new StylelintWebpackPlugin({
      context: 'src',
      configFile: path.resolve(__dirname, './stylelint.config.js'),
      files: ['**/*.scss'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    compress: true,
    port: 9527,
    open: true,
    hot: true,
    proxy: {
      // '/api': 'http://localhost:9000',
    },
    historyApiFallback: true,
  },
};
