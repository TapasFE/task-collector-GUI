import React from 'react';
import _ from 'lodash';
import TasksListItem from './tasks-list-item.js';

export default class TasksList extends React.Component {
	render() {
		return (
			<div>
					{ this.createTaskList() }
			</div>
		);
	}
	createTaskList(){
		return _.map(this.props.data,(task, time)=> {
		 	return <TasksListItem key = {time} task = {task} date = {time} {...this.props} ></TasksListItem>
		});
	}
}
