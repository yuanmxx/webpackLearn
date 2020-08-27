// import Text from './image/text.png';
import "./css/less.less";
import Header from '@/pages/header/index.jsx'
// import './font/iconfont.css';
// import { add } from './utils'
// import '@babel/polyfill';

// var img = new Image();
// img.src = Text;
// console.log(2222)
// var divs = document.createElement("div")
// divs.className="ymxfont ymxfont-mianxingbingbao"
// divs.style.width="40px"s
// divs.style.height="40px"
// divs.style.color="pink"
// console.log(66666)
// document.getElementById('root').append(img);
// document.getElementById('root').append(divs);


const list = [
    new Promise(() => {}),
    new Promise(() => {}),
]
// add(1,4);
list.map((each,i) => console.log(`promise---${i}`,each))
import * as React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(<div><Header /></div>,document.getElementById('root'))