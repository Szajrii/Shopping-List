import 'bootstrap';
import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Application from './pages/Application';
import Main from './pages/Main';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Main}></Route>
                <Route path="/register" exact component={Main}></Route>
                <Route path="/app" exact component={Application}></Route>
            </Switch>
        </Router>
    );
}

export default App;
