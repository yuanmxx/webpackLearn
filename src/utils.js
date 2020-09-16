import lodash from 'lodash';

import React, { Component } from "react";
// import JQ from 'jquery';
export const add = (a,b) => {
    return a+b;
}

export function minus (a,b){
    return a-b
}

// 按需加载
// import()
// bundle-loader插件
// react-loadable
export default function AsyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
 
            this.state = {
                component: null
            };
        }

 
        async componentDidMount() {
            const { default: component } = await importComponent();
 
            this.setState({
                component: component
            });
        }
 
        render() {
            const C = this.state.component;
 
            return C ? <C {...this.props} /> : null;
        }
    }
 
    return AsyncComponent;
}
