import React, { Component } from 'react'
import './index.less';
import { Button } from 'antd'

export default class Header extends Component{
    render(){
        return <div className="headers"><Button>我是头部组件</Button></div>
    }
}