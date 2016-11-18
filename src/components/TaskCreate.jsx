import React from 'react';
import {browserHistory} from 'react-router';
import {formatDate, debounce} from '../utils';

const TASK_KEY = '__task';

export default class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastDay: '',
      today: '',
      risks: '',
    };
    this.debouncedSaveData = debounce(this.saveData, 500);
    this.debouncedLoadData = debounce(this.loadLastDay, 2000);
  }

  componentDidMount() {
    let cache;
    try {
      cache = JSON.parse(localStorage.getItem(TASK_KEY));
    } catch (e) {
      return;
    }
    cache && this.setState(cache);
    this.debouncedLoadData();
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
          <button className="btn btn-default btn-xs" onClick={this.fillWithLastDay} disabled={!this.hasCachedLastDay()}>填入昨日数据</button>
          <textarea className="form-control" value={lastDay} onChange={this.getHandlerChange('lastDay')} />
        </div>
        <div className="form-group">
          <label>今日任务</label>
          <textarea className="form-control" value={today} onChange={this.getHandlerChange('today')} />
        </div>
        <div className="form-group">
          <label>当前风险</label>
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
      key === 'name' && this.debouncedLoadData();
    };
  }

  saveData = () => {
    const {name, lastDay, today, risks} = this.state;
    localStorage.setItem(TASK_KEY, JSON.stringify({
      name, lastDay, today, risks,
    }));
  }

  fillWithLastDay = e => {
    e.preventDefault();
    this.setState({
      lastDay: this.state.cachedLastDay,
    });
  }

  hasCachedLastDay() {
    return this.state.cachedLastDay;
  }

  loadLastDay() {
    const {name} = this.state;
    if (!name) return;
    fetch(`/api/tasks?user=${encodeURIComponent(name)}&date=lastDay`)
    .then(res => res.json())
    .then(data => data.rows[0])
    .then(item => {
      if (!item) return;
      let data;
      try {
        data = JSON.parse(item.content);
      } catch (e) {
        // ignore invalid data
      }
      return data && data.today;
    })
    .then(today => {
      this.setState({
        lastDay: this.state.lastDay || today,
        cachedLastDay: today,
      });
    });
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
      localStorage.setItem(TASK_KEY, {name});
      browserHistory.push('/');
    });
  }
}
