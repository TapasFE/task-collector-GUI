import React from 'react';
import {Link} from 'react-router';
import {Me} from '../restful';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {me: {}};
  }

  componentWillMount() {
    Me.get().then(res => {
      this.setState({me: res.data});
    }, err => {
      if (err.status === 401) {
        // Not logged in
        location.replace('/account/login');
      } else if (err.status === 404) {
        // Invalid user
        location.replace('/account/logout');
      }
    });
  }

  renderNav() {
    const {me} = this.state;
    const {routes} = this.props;
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
                <img src={me.avatar} />
                <span className="ml-2 hidden-xs">{me.name}</span>
              </li>
          }
        </ul>
      </header>
    );
  }

  render() {
    return (
      <div className="d-flex flex-column h-100">
        {this.renderNav()}
        <div className="container flex-auto mb-3">{this.props.children}</div>
      </div>
    );
  }
}
