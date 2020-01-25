import React from 'react';
import {Route} from 'react-router-dom';
import Login from '../layouts/Login'
import Register from '../layouts/Register'

export default () => {
    return (
        <div className="main">
            <div className="panel">
                <Route path="/" exact component={Login}></Route>
                <Route path="/register" exact component={Register}></Route>
            </div>
        </div>
    )
}
