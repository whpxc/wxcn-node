/*
 * @Description: Brian's code
 * @FilePath: \wxcn-node\src\vitePlugins\textCompile.ts
 * @Author: Brian brian@gmail.com
 * @Date: 2023-11-30 12:49:17
 * @LastEditors: Brian brian@gmail.com
 * @LastEditTime: 2023-12-19 15:03:35
 */
import chokidar from "chokidar";
import fs from "fs";
import path from "path";

import chalk from "chalk";
// const chalk = {
// 	greenBright(text:string){
// 		return text
// 	},
// 	blue(text:string){
// 		return text
// 	}
// }
interface ICfg {
	"textEntry": string,
	"textOut":string,
	"jsonEntry": string,
	"locales": string
}

const cfgName = "wxc.config.json";
const zhCNName = 'zhCN.ts'

/** 项目更目录 */
const pwd = process.cwd();

const main = ():ICfg => {
	/** 配置文件赋值 */
	let jsonStr = '';
	try {
		jsonStr = fs.readFileSync(path.join(pwd, cfgName), "utf-8")
	} catch(e) {
		console.log(chalk.greenBright(
`
[textCompile] 请先创建配置文件 wxc.config.json

{
	/** 文案所在目录 */
	"textEntry": "/src/languages/ts",
	/** 编译后文案文件路径 */
	"textOut": "/public/textDir/XXX.json",
	/** json文案所在目录 */
	"jsonEntry": "/public/textDir",
	/** 文案提示文件路径 */
	"locales": "/locales/zh-CN.json"
}

`
		));
		throw new Error("[textCompile] 没有找到配置文件")
	}

	const cfgJson = JSON.parse(jsonStr);
	for(let item in cfgJson) {
		const filePath = path.join(pwd, cfgJson[item])
		if(!fs.existsSync(filePath)) {
			if(filePath.indexOf('.') == -1) {
				fs.mkdirSync(filePath, { recursive: true }); // 创建多级目录
			} else {
					// 如果文件不存在，创建文件
					const directoryPath = path.dirname(filePath);
				if (!fs.existsSync(directoryPath)) {
					// 如果目录不存在，先创建目录
					fs.mkdirSync(directoryPath, { recursive: true }); // 创建多级目录
				}
				// 然后创建文件
  				fs.writeFileSync(filePath, '', 'utf-8'); // 写入空内容，相当于创建文件
			}
		}
		cfgJson[item] = path.join(pwd, cfgJson[item]);
	}
	return cfgJson
}
// 初始化配置
const cfgJson = main();

/**
 * @des 生成locales文案
 */

const locales = () => {
	try {
		const zhCNText = new Function(
			`return ${fs.readFileSync(path.join(cfgJson.textEntry, zhCNName), "utf8").replace("export default ", "")}`
		)();
		fs.writeFileSync(cfgJson.locales, JSON.stringify(zhCNText.items, null, 4));
		console.log(chalk.greenBright("[textCompile] 文案提示编译完成"), chalk.blue(cfgJson.locales));
	} catch (error) { 
		throw new Error("[textCompile] 还没有创建多语言文件")
	}
};

const textDirIndex = () => {
	// 获取所有多语言文件
	const files = fs.readdirSync(cfgJson.textEntry);
	// 组合多语言对象
	const langO = files.reduce((init: { [x: string]: any; }, item: string) => {
		const str = fs.readFileSync(path.join(cfgJson.textEntry, item), "utf8");
		init[item] = new Function("return" + str.replace("export default ", ""))().items;
		return init;
	}, {} as any);
	// 生成语言json格式
	const json = Object.keys(langO[zhCNName]).reduce((init, item) => {
		files.forEach((v: string) => {
			if (!init[item]) init[item] = {};
			init[item][v.slice(0, -3)] = langO[v][item];
		});
		return init;
	}, {} as any);

	// 覆盖 .json文案
	fs.writeFileSync(cfgJson.textOut, JSON.stringify(json, null, 4), "utf8");
	console.log(chalk.greenBright("[textCompile] 文案编译完成"), chalk.blue(cfgJson.textOut));
};

export const textCompile = (): any => {
	const watcher = chokidar.watch(path.join(cfgJson.textEntry, zhCNName), {
		persistent: true,
		awaitWriteFinish: {
			stabilityThreshold: 1000,
			pollInterval: 100
		},
		ignoreInitial: true
	});
	// 当文件保存时触发的事件
	return {
		name: "text-compile",
		apply: "serve",
		configureServer() {
		
			watcher.on("change", () => {
				locales();
				textDirIndex();
			});
		}
	};
};
