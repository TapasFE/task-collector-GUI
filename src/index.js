import './polyfills';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Me} from 'src/services/restful';
import store from 'src/services/store';
import App from './components/App';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import './style.css';

function loadMe(nextState, replace, callback) {
  Me.get()
  .then(res => {
    store.me = res.data;
  })
  .then(callback, err => {
    callback(err);
    if (err.status === 401) {
      // Not logged in
      location.replace('/account/login');
    } else if (err.status === 404) {
      // Invalid user
      location.replace('/account/logout');
    }
  });
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={loadMe}>
      <IndexRoute component={TaskList} name="list" />
      <Route path="/create" component={TaskCreate} name="create" />
    </Route>
  </Router>
), document.getElementById('app'));
