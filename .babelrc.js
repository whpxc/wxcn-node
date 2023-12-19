/*
 * @Description: Brian's code
 * @FilePath: \wxc-tool\.babelrc.js
 * @Author: Brian brian@gmail.com
 * @Date: 2023-12-18 15:25:31
 * @LastEditors: Brian brian@gmail.com
 * @LastEditTime: 2023-12-18 15:26:03
 */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // rollupjs 会处理模块，所以设置成 false
        modules: false,
      },
    ],
  ],
  plugins: [],
};
