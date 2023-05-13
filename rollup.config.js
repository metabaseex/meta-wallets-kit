import esbuild from 'rollup-plugin-esbuild'; // plugin-esbuild将ts变为js
import vue from 'rollup-plugin-vue'; // plugin-vue将vue结尾的文件变为js
// import css from 'rollup-plugin-css-only'; // 处理css
import styles from "rollup-plugin-styles"; // 提取css至单独的文件
// rollup-plugin-node-resolve 插件可以解决 ES6模块的查找导入，但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser"; // 变丑别人看不懂（压缩后的）
import rollupReplace from '@rollup/plugin-replace'; // 替换代码中的某些变量
import babel from 'rollup-plugin-babel';

export default {
  plugins: [
    // resolve(),
    rollupReplace({
      // 替换代码中的 process.env.NODE_ENV
      'process.env.NODE_ENV': JSON.stringify('production'),
       preventAssignment: true,
       /*__buildDate__: () => JSON.stringify(new Date()),
       __buildVersion: 15*/
    }),
  ]
}