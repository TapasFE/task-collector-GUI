import React from 'react';
import TaskItem from './TaskItem';
import {formatDate, debounce} from '../utils';
import store from 'src/services/store';
import {Tasks} from 'src/services/restful';

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
    const {me} = store;
    const {date} = this.state;
    Tasks.get(null, {date})
    .then(res => res.data.map(item => {
      try {
        item.data = JSON.parse(item.content);
      } catch (e) {
        // ignore invalid data
      }
      item.data = item.data || {};
      item.isAdmirer = item.admirers.some(item => item.id === me.id);
      return item;
    }))
    .then(data => {
      data.sort((a, b) => {
        const lenA = a.admirers && a.admirers.length || 0;
        const lenB = b.admirers && b.admirers.length || 0;
        return Math.sign(lenB - lenA);
      });
      this.setState({data});
    });
  }

  render() {
    const {date} = this.state;
    return (
      <div className="row h-100">
        <div className="col col-md-4 col-lg-3 hidden-sm-down d-flex flex-column">
          <div className="form-group">
            <input className="form-control" type="date" value={date} onChange={this.handleDateChange} />
          </div>
          <div className="list-group flex-auto">
            {this.renderNames()}
          </div>
        </div>
        <div className="col col-md-8 col-lg-9 col-xs-12 overflow-auto">
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
    return data.map((item, index) => (
      <TaskItem
        key={index}
        data={item}
        onAdmire={this.getAdmireHandler(item)}
      />
    ));
  }

  handleDateChange = e => {
    this.setState({date: e.target.value});
    this.debouncedLoadData();
  }

  getAdmireHandler(item) {
    const {me} = store;
    return e => {
      const model = Tasks.model(item.id, 'admirer');
      (item.isAdmirer ? model.delete() : model.put())
      .then(() => {
        const {isAdmirer} = item;
        const newItem = {
          ...item,
          isAdmirer: !isAdmirer,
          admirers: (
            isAdmirer
            ? item.admirers.filter(admirer => admirer.id !== me.id)
            : item.admirers.concat([me])
          ),
        };
        this.setState({
          data: this.state.data.map(item => item.id === newItem.id ? newItem : item),
        });
      });
    };
  }
}
