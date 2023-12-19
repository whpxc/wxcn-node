/*
 * @Description: Brian's code
 * @FilePath: \wxc-tool\scripts\rollup.config.dev.js
 * @Author: Brian brian@gmail.com
 * @Date: 2023-12-18 15:19:00
 * @LastEditors: Brian brian@gmail.com
 * @LastEditTime: 2023-12-18 15:53:09
 */

import baseConfig from "./rollup.config.base.js";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
	...baseConfig,
	plugins: [
		...baseConfig.plugins,
		serve({
			port: 8080,
			contentBase: ["dist", "examples/brower"],
			openPage: "index.html"
		}),
		livereload({
			watch: "examples/brower"
		})
	]
};
