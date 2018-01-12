import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/accordion.css';
import './css/cards.css';
import './css/dice.css';
import './css/theFeed.css';
import './css/gemMatcher.css';
import './css/gemstoneTreasureGenerator.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
