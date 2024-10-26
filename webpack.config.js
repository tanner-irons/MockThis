const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const DtsBundleWebpack = require('dts-bundle-webpack');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const nodeExternals  = require('webpack-node-externals');

module.exports = (env, argv) => ({
  entry: './lib/index.ts', // Entry point for your app
  devtool: argv.mode === 'production' ? false : 'source-map',
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
  externals: [nodeExternals()],
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
      out: '../index.d.ts', // Output path for the bundled declaration file
      removeSource: true,
      outputAsModuleFolder: true
    }),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['sh scripts/removeEmptyDirs.sh'],
        blocking: false,
        parallel: true,
      },
    }),
  ],
  optimization: {
    minimize: true, // Enable minification
    minimizer: [new TerserPlugin()], // Use Terser for minification
    usedExports: true, // Tree-shake unused exports
  },
});