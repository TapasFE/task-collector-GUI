import React from 'react';
import TaskItem from './TaskItem';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/tasks')
    .then(res => res.json())
    .then(data => data.rows.map(item => {
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
    return (
      <div className="task-list flex-auto flex-row">
        <div className="col col-sm-3 hidden-xs">
          <div className="list-group">
            {this.renderNames()}
          </div>
        </div>
        <div className="col col-sm-9">
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
}
