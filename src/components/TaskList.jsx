import React from 'react';
import TaskItem from './TaskItem';
import {formatDate, debounce} from '../utils';
import {Tasks} from '../restful';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: formatDate(new Date),
      data: [],
    };
    this.debouncedLoadData = debounce(this.loadData, 300);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {date} = this.state;
    Tasks.get(null, {date})
    .then(res => res.data.map(item => {
      try {
        item.data = JSON.parse(item.content);
      } catch (e) {
        // ignore invalid data
      }
      item.data = item.data || {};
      return item;
    }))
    .then(data => this.setState({data}));
  }

  render() {
    const {date} = this.state;
    return (
      <div className="row h-100">
        <div className="col col-sm-3 hidden-xs d-flex flex-column">
          <div className="form-group">
            <input className="form-control" type="date" value={date} onChange={this.handleDateChange} />
          </div>
          <div className="list-group flex-auto">
            {this.renderNames()}
          </div>
        </div>
        <div className="col col-sm-9 col-xs-12 overflow-auto">
          {this.renderItems()}
        </div>
      </div>
    );
  }

  renderNames() {
    const {data} = this.state;
    return data.map((item, index) => (
      <a key={index} href={`#task-${item.id}`} className="list-group-item">{item.user.name}</a>
    ));
  }

  renderItems() {
    const {data} = this.state;
    return data.map((item, index) => <TaskItem key={index} data={item} />);
  }

  handleDateChange = e => {
    this.setState({date: e.target.value});
    this.debouncedLoadData();
  }
}
