import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import HomePage from './components/home-page.jsx';
import TaskAdd from './components/task-add.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import './sass/index.scss';

render((
  <Router history={browserHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/taskAdd" component = {TaskAdd} />
  </Router>
), document.getElementById('app'));

// <Router history={browserHistory}>
//   <Route path="/" component={App}>
//     <IndexRoute component={Home}/>
//     <Route path="/repos" component={Repos}>
//       <Route path="/repos/:userName/:repoName" component={Repo}/>
//     </Route>
//     <Route path="/about" component={About}/>
//   </Route>
// </Router>