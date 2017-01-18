import React from 'react';

export default class TaskItem extends React.Component {
  render() {
    const {id, data, user} = this.props.data;
    return (
      <div className="card task-item mb-3" id={`task-${id}`}>
        <div className="card-header">
          <div className="task-buttons float-right">
            <i className="fa fa-thumbs-o-up"></i>
          </div>
          {user.name}
        </div>
        <div className="card-block">
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
        <div className="card-title">{title}</div>
        <pre>{value}</pre>
      </div>
    );
  }
}
