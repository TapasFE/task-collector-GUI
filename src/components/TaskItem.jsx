import React from 'react';

export default class TaskItem extends React.Component {
  render() {
    const {id, data, user, admirers, isAdmirer} = this.props.data;
    return (
      <div className="card task-item mb-3" id={`task-${id}`}>
        <div className="card-header">
          <div className="task-buttons float-right">
            <i
              className={`fa ${isAdmirer ? 'fa-thumbs-up' : 'fa-thumbs-o-up'} cursor-pointer`}
              onClick={this.props.onAdmire}
            ></i>
            {admirers.length || ''}
          </div>
          {user.name}
        </div>
        <div className="card-block">
          {this.renderItem('昨日任务', data.lastDay)}
          {this.renderItem('今日任务', data.today)}
          {this.renderItem('当前风险', data.risks)}
        </div>
        {!admirers.length ||
            <div className="card-footer">
              <span className="align-middle">{admirers.length}人赞了：</span>
              {admirers.map((admirer, index) => (
                <div className="avatar mr-1 align-middle" key={index} title={admirer.name}>
                  <img src={admirer.avatar} />
                </div>
              ))}
            </div>
        }
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
