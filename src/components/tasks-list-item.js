import React from 'react';
import ProItem from './item.js';

export default class TodosListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
		};
	}
	renderTaskSection() {
		var tasks=this.props.data.tasks;
		return tasks.map((task,index)=>{
			return <ProItem {...this.props} itemData={task} key={index} ></ProItem>
		});
	}
	render() {
		// console.log(33,this.props);
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
		// 获取项目负责人名字
		var personname=this.props.task.name;
		// 获取日期
		var date=this.props.data.date.join('');
		this.props.createTask(personname,date);
	}
}
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