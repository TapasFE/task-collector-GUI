import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Test from './components/home-test.jsx';
import UI from './components/home-ui.jsx';
import HomePage from './components/home-page.jsx';

import Develop from './components/home-develop.jsx';
import './sass/index.scss';

// render(
// 	<HomePage/>,
// 	document.getElementById('app')
// );
render((
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}>
      <IndexRoute component={Develop}/>
      <Route path="/test" component={Test}/>
      <Route path="/ui" component={UI}/>
    </Route>
  </Router>
), document.getElementById('app'))

// <Router history={browserHistory}>
//   <Route path="/" component={App}>
//     <IndexRoute component={Home}/>
//     <Route path="/repos" component={Repos}>
//       <Route path="/repos/:userName/:repoName" component={Repo}/>
//     </Route>
//     <Route path="/about" component={About}/>
//   </Route>
// </Router>