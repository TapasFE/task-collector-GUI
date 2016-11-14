import React from 'react';
import ProItem from './item.js';

// console.log('tasks-list-item.js --- start');
export default class TodosListItem extends React.Component {
	renderTaskSection() {
		const {tasks} = this.props;
		if (!tasks || !tasks.length) return;
		return tasks.map((task,index)=>{
			return <ProItem {...this.props} itemData={task} key={index} ></ProItem>
		});
	}
	render() {
		return (
			<div className='content'>
				<h2>
					{this.props.topic}
					<span className="add" style={{background:'orange'}} onClick={this.onAddClick.bind(this)}>add</span>
				</h2>
				{
					this.renderTaskSection()
				}
			</div>
		);
	}
	onAddClick(){
		// 获取项目负责人名字、日期
		const {name, date, createTask} = this.props;
		createTask(name,date);
	}
}
// console.log('tasks-list-item.js --- end');
