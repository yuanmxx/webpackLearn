import React, { Component } from 'react';
import Headers from './Header/index.jsx';
import Footer from './Footer/index.jsx';
import Content from './Content/index.jsx';
import routes from '@/Router/routes';
import { Route, Redirect, Switch,  BrowserRouter as Router, } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import './index.less';

class Header extends Component{
    render(){
        console.log(this.props)
        return(
            <ConfigProvider prefixCls="ymx">
            <div className="wrap">
                <Headers />
                <Content>
                    <Router>
                        <Switch>
                            {
                                routes.map(route => { 
                                    return(
                                    <Route 
                                        key = {route.path}
                                        path = {route.path}
                                        component = {route.componentPath}/>
                                    )
                                })
                            }
                            <Redirect exact from = "/" to = {routes[0].path} />
                            <Redirect to = '/404'/>
                        </Switch>
                    </Router>
                </Content>
                <Footer />
            </div>
            </ConfigProvider>
        )
    }
}

export default Header