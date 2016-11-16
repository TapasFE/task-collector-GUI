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
          <dt>昨日任务</dt>
          <dd><pre>{data.lastDay}</pre></dd>
          <dt>今日任务</dt>
          <dd><pre>{data.today}</pre></dd>
          <dt>当前风险</dt>
          <dd><pre>{data.risks}</pre></dd>
        </div>
      </div>
    );
  }
}
