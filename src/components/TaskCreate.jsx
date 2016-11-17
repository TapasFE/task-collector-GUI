import React from 'react';
import {browserHistory} from 'react-router';
import {formatDate, debounce} from '../utils';

export default class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: formatDate(new Date),
      name: '',
      lastDay: '',
      today: '',
      risks: '',
    };
    this.debouncedSaveData = debounce(this.saveData, 500);
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
          <a className="btn btn-default btn-sm" onClick={this.lastDayReset}  >昨日任务复位</a>
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
      this.debouncedSaveData();
      if (key === 'name'){
        this.loadLastDay();
      }
    };
  }
  
  saveData = () => {
    localStorage.CBN_task = JSON.stringify(this.state);
  }

  lastDayReset = () => {
    this.loadLastDay();
    this.debouncedSaveData();
  }

  loadLastDay() {
    const {user} = this.state;
    if (!user) return;
    const date = formatDate(new Date(new Date()-1000*60*60*24));
    fetch(`/api/tasks?user=${user}&date=${date}`)
    .then(res => res.json())
    .then(data => data.rows.map(item => {
      try {
        item.data = JSON.parse(item.content);
      } catch (e) {
        // ignore invalid data
      }
      item.data = item.data || {};
      return item.lastDay;
    }))
    .then(lastDay => lastDay && this.setState({lastDay}));
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
    .then(() => {
      localStorage.removeItem('CBN_task');
      browserHistory.push('/');
    });
  }

  componentDidMount() {
    const cache = JSON.parse(localStorage.CBN_task ? localStorage.CBN_task : null);
    const {date} = cache ? cache : {};
    date && this.setState(cache);
  }
}
