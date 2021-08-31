const plugins = [];

// npm run build でビルドする際 console の使用箇所があるとエラーになるので除去する
// refer : https://neos21.net/blog/2020/01/18-01.html
// if (process.env.NODE_ENV === 'production') {
//  plugins.push('transform-remove-console');
// }
plugins.push('transform-remove-console');

// bellow is original configuration
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: plugins
};