import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import TasksListItem from './tasks-list-item.js';
window.moment=moment;

// console.log('tasks-list.js --- start');
export default class TasksList extends React.Component {
	render() {
		// console.log('tasks-list.js render');
		let {data, name} = this.props;
		// var time1 = moment().format('YYYY,MM,DD');
		// var time2 = moment().subtract(1,'days').format('YYYY,MM,DD');
		let [time0, time1] = Object.keys(data);
		
		if(new Date(time0) - new Date(time1) < 0){
			[time0, time1] = [time1, time0];
		}
		var yesData=data[time1];
		var todData=data[time0];

		return (
			<div className='wrap'>
				<div className="msg">
					<h3>{name}</h3>
					<TasksListItem  topic='昨日任务' tasks={yesData} date={time1} {...this.props}></TasksListItem>
					<TasksListItem  topic='今日任务' tasks={todData} date={time0} {...this.props}></TasksListItem>
				</div>
			</div>
		);
	}
}
// console.log('tasks-list.js --- end');
