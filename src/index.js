import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './components/App';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import './style.css';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={TaskList} name="list" />
      <Route path="/create" component={TaskCreate} name="create" />
    </Route>
  </Router>
), document.getElementById('app'));
