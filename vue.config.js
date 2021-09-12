module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  assetsDir: "",
  outputDir: "docs",
  // add for set title
  // refer : https://suzuki-navi.hatenablog.com/entry/2020/11/23/215712
  pages: {
    index: {
      entry: "src/main.js",
      title: "NikkeiDigital_links",
    }
  },
}
