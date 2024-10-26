import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import DtsBundleWebpack from 'dts-bundle-webpack';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';
import nodeExternals from 'webpack-node-externals';
import { Configuration } from 'webpack';

export default (env: any, argv: any): Configuration => ({
  entry: './src/index.ts', // Entry point for your app
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