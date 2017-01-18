import React from 'react';
import {browserHistory} from 'react-router';
import {debounce} from '../utils';
import {Me, Tasks} from '../restful';

const TASK_KEY = '__task';

export default class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastDay: '',
      today: '',
      risks: '',
    };
    this.debouncedSaveData = debounce(this.saveData, 500);
  }

  componentDidMount() {
    let cache;
    try {
      cache = JSON.parse(localStorage.getItem(TASK_KEY));
    } catch (e) {
      return;
    }
    cache && this.setState(cache);
    this.loadLastDay();
  }

  render() {
    const {lastDay, today, risks} = this.state;
    return (
      <div className="row task-create">
        <form className="col-12" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <button className="btn btn-secondary btn-sm float-right" onClick={this.fillWithLastDay} disabled={!this.hasCachedLastDay()}>填入昨日数据</button>
            <label>昨日任务</label>
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
          <span className="text-muted ml-3">您的修改将自动保存到本地</span>
        </form>
      </div>
    );
  }

  getHandlerChange(key) {
    return e => {
      this.setState({[key]: e.target.value});
      this.debouncedSaveData();
    };
  }

  saveData = () => {
    const {lastDay, today, risks} = this.state;
    localStorage.setItem(TASK_KEY, JSON.stringify({
      lastDay, today, risks,
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
    Me.get('last_day_task')
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
    const {lastDay, today, risks} = this.state;
    if (!lastDay || !today) return;
    Tasks.post(null, {
      content: JSON.stringify({
        lastDay,
        today,
        risks,
      }),
    })
    .then(() => {
      localStorage.removeItem(TASK_KEY);
      browserHistory.push('/');
    });
  }
}
