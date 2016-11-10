import React from 'react';
import TasksList from './tasks-list.js';

const tasksList = [
	{
		name: '小明',
		proList:[
			{
				date:[2016,11,'09'],
				tasks:[
					{
						proName:'cbndata web',
						proContents:['编写通用组件','弹窗','轮播器','导航栏'],
						editing:false,
					},
					{
						proName:'cbndata page',
						proContents:['优化弹窗组件在移动端的的显示效果和交互','编写报告列表页面'],
						editing:false,
					},
					// {
					// 	proName:'',
					// 	proContents:[''],
					// 	editing:false,
					// }
				]
			},
			{
				date:[2016,11,'10'],
				tasks:[
					{
						proName:'cbndata web1',
						proContents:['编写通用组件1','弹窗1','轮播器1','导航栏1'],
						editing:false,
					},
					{
						proName:'cbndata page1',
						proContents:['优化弹窗组件在移动端的的显示效果和交互1','编写报告列表页面1'],
						editing:false,
					}
				]
			},

		],
	},
	{
		name: '小黑',
		proList:[
			{
				date:[2016,11,'09'],
				tasks:[
					{
						proName:'HugoInvest',
						proContents:['重构构建代码','调整图片上传功能，七牛CDN使用自定义域名'],
						editing:false,
					},
					{
						proName:'cbndweekly web',
						proContents:['weekly网站页面开发'],
						editing:false,
					},
				]
			},
			{
				date:[2016,11,'10'],
				tasks:			[
					{
						proName:'HugoInvest1',
						proContents:['重构构建代码1','调整图片上传功能，七牛CDN使用自定义域名1'],
						editing:false,
					},
					{
						proName:'cbndweekly web1',
						proContents:['weekly网站页面开发1'],
						editing:false,
					}
				]
			},

		],
	}
];


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasksList,
		};
	}
	render() {
		return (
			<div>
				<h1>Tasks List</h1>
				{ this.createTaskList() }
			</div>
		);
	}
	createTaskList(){
		return this.state.tasksList.map((task,index)=>
		 	<TasksList 
				key={index}
				task = {task} 
				createTask={this.createTask.bind(this)} 
				saveTask={this.saveTask.bind(this)}
				deleteTask={this.deleteTask.bind(this)}
				deleteTaskItem={this.deleteTask.bind(this)}
			/>
		)
	}
	queryName_Date(name,date){
		const person = _.find(this.state.tasksList, task=> task.name === name);
		const day = _.find(person.proList, pro=> pro.date.join('') === date);
		return [person, day];
	}
	createTask(name,date) {
		const [person,day]=this.queryName_Date(name,date);
		day.tasks.push({
			proName:'',
			proContents:[''],
			editing:false,
		});
		this.setState({ tasksList: this.state.tasksList});
	}
	saveTask(name,date,oldTask,newTask) {
		const [person,day]=this.queryName_Date(name,date);
		let task = _.find(day.tasks, task=> task === oldTask);
		task= newTask;
		this.setState({ tasksList: this.state.tasksList});
	}
	deleteTask(name,date,oldTask) {
		const [person,day]=this.queryName_Date(name,date);
		_.remove(day.tasks, task=> task === oldTask);
		this.setState({ tasksList: this.state.tasksList});
	}
}