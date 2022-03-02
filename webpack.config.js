module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./mockthis/lib/index.ts",
    output: {
      filename: "./mockthis/dist/mockthis.min.js"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    }
  };