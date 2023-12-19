/*
 * @Description: Brian's code
 * @FilePath: \wxc-tool\scripts\rollup.config.prod.js
 * @Author: Brian brian@gmail.com
 * @Date: 2023-12-18 15:19:11
 * @LastEditors: Brian brian@gmail.com
 * @LastEditTime: 2023-12-18 15:24:47
 */

import baseConfig from "./rollup.config.base";
import filesize from "rollup-plugin-filesize";

export default {
  ...baseConfig,
  plugins: [...baseConfig.plugins, filesize()],
};
