import React from 'react';
import _ from 'lodash';

import TasksListItem from './tasks-list-item.js';


export default class TasksList extends React.Component {
	constructor(props) {
		super(props);
	}
	getData(time){
		return _.find(this.props.task.proList, task=> task.date.join('') === time) || {};
	}
	render() {
		let tmp=this.props.task;
		var date1=new Date();
		var date2=new Date(date1-1000*60*60*24)
		var m1=date1.getMonth()+1,d1=date1.getDate(),m2=date2.getMonth()+1,d2=date2.getDate();
		var time1=""+date1.getFullYear()+(m1<10 ? '0'+m1 : m1)+(d1<10 ? '0'+d1 : d1);
		var time2=""+date2.getFullYear()+(m2<10 ? '0'+m2 : m2)+(d2<10 ? '0'+d2 : d2);

		var yesData=this.getData(time2);
		var todData=this.getData(time1);
		return (
			<div className='wrap'>
				<div className="msg">
					<h3>{tmp.name}</h3>
					<TasksListItem  topic='昨日任务' data={yesData} {...this.props}></TasksListItem>
					<TasksListItem  topic='今日任务' data={todData} {...this.props}></TasksListItem>
				</div>
			</div>
		);
	}
}
	// {
	// 	name: '小明',
	// 	proList:[
	// 		{
	// 			date:[2016,11,11],
	// 			tasks:[
	// 				{
	// 					proName:'cbndata web',
	// 					proContents:['编写通用组件','弹窗','轮播器','导航栏'],
	// 					editing:false,
	// 				},
	// 				{
	// 					proName:'cbndata page',
	// 					proContents:['优化弹窗组件在移动端的的显示效果和交互','编写报告列表页面'],
	// 					editing:false,
	// 				},
	// 			]
	// 		},
	// 		{
	// 			date:[2016,11,12],
	// 			tasks:			[
	// 				{
	// 					proName:'cbndata web1',
	// 					proContents:['编写通用组件1','弹窗1','轮播器1','导航栏1'],
	// 					editing:false,
	// 				},
	// 				{
	// 					proName:'cbndata page1',
	// 					proContents:['优化弹窗组件在移动端的的显示效果和交互1','编写报告列表页面1'],
	// 					editing:false,
	// 				}
	// 			]
	// 		},

	// 	],
	// },