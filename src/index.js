import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ReactRouter from './router/router';

ReactDOM.render(
    <Router>
        <ReactRouter> </ReactRouter>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
