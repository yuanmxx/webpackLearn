// webpack基础以及tree shaking

// import Text from './image/text.png';
// import "./css/less.less";
// import './font/iconfont.css';
// import { add } from './utils'
// // import '@babel/polyfill';

// var img = new Image();
// img.src = Text;
// console.log(2222)
// var divs = document.createElement("div")
// divs.className="ymxfont ymxfont-mianxingbingbao"
// divs.style.width="40px"
// divs.style.height="40px"
// divs.style.color="pink"
// console.log(66666)
// document.getElementById('root').append(img);
// document.getElementById('root').append(divs);


// const list = [
//     new Promise(() => {}),
//     new Promise(() => {}),
// ]
// add(1,4);
// list.map((each,i) => console.log(`promise---${i}`,each))


// react配置解析jsx

// import * as React from 'react';
// import ReactDom from 'react-dom';
// import Wrap from '@/layouts/index.jsx';
// import "./css/less.less";
// // import {
// //     BrowserRouter as Router,
// //     Route
// //   } from 'react-router-dom'

// ReactDom.render(
//  <Wrap />,
// document.getElementById('root'))


// 代码没有分割

// import _ from 'lodash';
// console.log(_.join(['yuan','ming','xiang'],'---'));
// // 中间省略一万行代码....
// console.log(_.join(['yuan','ming','xiang'],'--->'));


// 代码分割（同步）

// console.log(_.join(['yuan','ming','xiang'],'---'));
// // 中间省略一万行代码....
// console.log(_.join(['yuan','ming','xiang'],'--->'));

// 代码分割（异步）

// function getLodash(){
//   return import('lodash').then(({default:_}) => {
//       var ele = document.createElement('div');
//       ele.innerHTML  = _.join(['yuan','ming','xiang'],'---');
//       return ele;
//   })
// }

// getLodash().then(ele => {
//   console.log(111,ele);
//   document.body.append(ele)
// })


//代码分割（异步）
import JQ from 'jquery';
// console.log(JQ)
async function getLodash(){
  // magic Comments写法，可以更改打包分块代码0.js/1.js...模块的名字
//   const { default: _ } = await import(/* webpackChunkName: "lodash-"*/'lodash');
  const { add } = await import(/* webpackChunkName: "utils-"*/'./utils');
//   const ele = document.createElement('div');
//   ele.innerHTML  = _.join(['yuan','ming','xiang'],'--->');
//   return ele;
    return add(1,4)
}

getLodash().then(ele => {
  document.body.append(ele)
})