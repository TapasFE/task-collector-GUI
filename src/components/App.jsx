import React from 'react';
import {Link} from 'react-router';
import store from 'src/services/store';

export default function App(props) {
  function renderNav() {
    const {me={}} = store;
    const {routes} = props;
    const route = routes[routes.length - 1];
    return (
      <header className="container mt-4 mb-3">
        <ul className="nav nav-tabs">
          <li>
            <span className="navbar-brand">Task Collector</span>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${route.name === 'list' ? 'active' : ''}`} to="/">列表</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${route.name === 'create' ? 'active' : ''}`} to="/create">撰写</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" target="_blank" href="https://github.com/TapasFE/task-collector/issues">反馈</a>
          </li>
          {me.id &&
              <li className="user-corner ml-auto">
                <div className="avatar align-middle"><img src={me.avatar} /></div>
                <span className="ml-2 hidden-xs align-middle">{me.name}</span>
              </li>
          }
        </ul>
      </header>
    );
  }

  return (
    <div className="d-flex flex-column h-100">
      {renderNav()}
      <div className="container flex-auto mb-3">{props.children}</div>
    </div>
  );
}
