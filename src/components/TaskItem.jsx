import React from 'react';

export default class TaskItem extends React.Component {
  render() {
    const {id, data, user} = this.props.data;
    return (
      <div className="panel panel-default" id={`task-${id}`}>
        <div className="panel-heading">
          <div className="panel-title">{user.name}</div>
        </div>
        <div className="panel-body">
          {this.renderItem('昨日任务', data.lastDay)}
          {this.renderItem('今日任务', data.today)}
          {this.renderItem('当前风险', data.risks)}
        </div>
      </div>
    );
  }

  renderItem(title, value) {
    if (!value || /^\s*无?\s*$/.test(value)) return null;
    return (
      <div>
        <h4>{title}</h4>
        <pre>{value}</pre>
      </div>
    );
  }
}
