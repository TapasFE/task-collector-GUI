import React from 'react';

export default class TodosListItem extends React.Component {
  renderTaskSection() {
    if (!this.props.task) return;
    return {__html: this.props.task.replace(/\n/g,'<br>')};
  }
  render() {
    let {name} = this.props;
    return (
      <div className='wrap'>
        <div className="msg">
          <h3>{name}</h3>
          <div className='content' dangerouslySetInnerHTML = {this.renderTaskSection()}>
          </div>
        </div>
      </div>
    );
  }
}
