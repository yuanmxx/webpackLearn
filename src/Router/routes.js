
import AsyncComponent from '@/utils.js';
export default [
    {
        path:'/home',
        componentPath: AsyncComponent(() => import('../pages/Home/index.jsx')),
        key:'home'
    },
    {
        path:'/detail',
        componentPath: AsyncComponent(() => import('../pages/Detail/index.jsx')),
        key:'detail'
    },
    {
        path:'/about',
        componentPath: AsyncComponent(() => import('../pages/About/index.jsx')),
        key:'about'
    },
]