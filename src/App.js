import 'bootstrap';
import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './pages/Main';
import Login from "./layouts/Login";


function App() {
    return (
        <Router>
            <Route path="/" component={Main}></Route>
        </Router>
    );
}

export default App;
