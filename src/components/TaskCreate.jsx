import React from 'react';
import {browserHistory} from 'react-router';

export default class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastDay: '',
      today: '',
      risks: '',
    };
  }

  render() {
    const {name, lastDay, today, risks} = this.state;
    return (
      <form className="task-create flex-auto" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>姓名</label>
          <input type="text" className="form-control" value={name} onChange={this.getHandlerChange('name')} />
        </div>
        <div className="form-group">
          <label>昨日任务</label>
          <textarea className="form-control" value={lastDay} onChange={this.getHandlerChange('lastDay')} />
        </div>
        <div className="form-group">
          <label>今日任务</label>
          <textarea className="form-control" value={today} onChange={this.getHandlerChange('today')} />
        </div>
        <div className="form-group">
          <label>目前风险</label>
          <textarea className="form-control" value={risks} onChange={this.getHandlerChange('risks')} />
        </div>
        <button className="btn btn-primary" type="submit">提交</button>
      </form>
    );
  }

  getHandlerChange(key) {
    return e => {
      this.setState({[key]: e.target.value});
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const {name, lastDay, today, risks} = this.state;
    if (!name || !lastDay || !today) return;
    const data = {
      user: name,
      content: JSON.stringify({
        lastDay,
        today,
        risks,
      }),
    };
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(data => {
      console.log(data);
      browserHistory.push('/');
    });
  }
}
