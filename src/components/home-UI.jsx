import React from 'react';
import App from './app.jsx';

export default class UI extends React.Component {
  render() {
    return (
      <div className='ui'>
        <App {...this.props}></App>
      </div>
    );
  }
}
