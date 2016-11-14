import React from 'react';
import App from './app.jsx';

export default class Test extends React.Component {
  render() {
    console.log('test render');
    return (
      <div className='test'>
        <App {...this.props}></App>
      </div>
    );
  }
}
