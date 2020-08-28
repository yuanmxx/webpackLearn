import React, { Component } from 'react';
import './index.less';



export default class Footer extends Component {
    render(){
        return (
            <div className="content">{this.props.children}</div>
        )
    }
}