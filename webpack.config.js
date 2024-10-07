const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
  entry: './mockthis/index.ts', // Entry point for your app
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // Automatically resolve .ts and .js extensions
  },
  output: {
    filename: 'index.js', // Name of the output bundle
    path: path.resolve(__dirname, 'dist'),
    library: 'MockThis', // Name of the global variable for UMD builds
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new DtsBundleWebpack({
      name: 'mockthis',
      main: 'dist/types/index.d.ts', // Path to the main declaration file
      out: 'index.d.ts', // Output path for the bundled declaration file
      removeSource: true,
      outputAsModuleFolder: true
    })
  ],
  // optimization: {
  //   minimize: true, // Enable minification
  //   minimizer: [new TerserPlugin()], // Use Terser for minification
  // },
};