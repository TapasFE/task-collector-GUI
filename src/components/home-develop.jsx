import React from 'react';
import App from './app.jsx';

export default class Develop extends React.Component {
  render() {
    return (
      <div className='develop'>
        <App {...this.props}></App>
      </div>
    );
  }
}

