import React from 'react';
import {Link} from 'react-router';

export default props => {
  const {routes} = props;
  const route = routes[routes.length - 1];
  return (
    <div className="container flex-col">
      <div className="flex-row">
        <h1>Task Collector</h1>
        <ul className="nav nav-pills">
          <li className={route.name === 'list' ? 'active' : ''}>
            <Link to="/">列表</Link>
          </li>
          <li className={route.name === 'create' ? 'active' : ''}>
            <Link to="/create">撰写</Link>
          </li>
        </ul>
      </div>
      <div className="content flex-auto flex-col">{props.children}</div>
    </div>
  );
};