import Text from './image/text.png';
import "./css/index.css";
import './font/iconfont.css';

var img = new Image();
img.src = Text;
console.log(1111)

var divs = document.createElement("div")
divs.className="iconfont icon-mianxingbingbao"
divs.style.width="40px"
divs.style.height="40px"
divs.style.color="pink"

document.getElementById('root').append(img);
document.getElementById('root').append(divs);