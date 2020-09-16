import React, { Component } from 'react'
import './index.less';
import { Button } from 'antd';
import config from '../config';


export default class Header extends Component{
    render(){
        return (
            <div className="headers"> 
                <Button>点我{config.name}</Button>
            </div>
        )
    }
}