import React from 'react';
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
		let data = this.props.data;
		return Object.keys(data).sort().map((time)=>{
			let task = data[time];
			return <TasksListItem key = {time} task = {task} date = {time} {...this.props} ></TasksListItem>
		})
	}
}
