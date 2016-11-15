import React from 'react';
import TasksList from './tasks-list.js';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Tasks List</h1>
				{ this.createTaskList() }
			</div>
		);
	}
	createTaskList(){
		return _.map(this.props.tasksList,(tasks,name)=> {
		 	return <TasksList 
				key = {name}
				data = {tasks} 
				name = {name}
				{...this.props}
			/>
		});
	}
}
