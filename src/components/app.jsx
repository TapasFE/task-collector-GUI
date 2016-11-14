import React from 'react';
import TasksList from './tasks-list.js';

// ajax请求
// !function loadXMLDoc()
// {
// var xmlhttp;
// if (window.XMLHttpRequest)
//   {
//   xmlhttp=new XMLHttpRequest();
//   }
// else
//   {
//   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//   }
// xmlhttp.onreadystatechange=function()
//   {
//   if (xmlhttp.readyState==4 && xmlhttp.status==200)
//     {
//     console.log(xmlhttp.responseText);
//     }
//   }
// xmlhttp.open("GET","http://127.0.0.1:4333/api/tasks?date=2016-11-10",true);
// xmlhttp.send();
// }()

// post请求
// var URL='http://localhost:4333/api/tasks';
// var req = new Request(URL, {
//   method: 'POST', 
//   mode: 'no-cors',
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   body:"user=可可2w1&content="+JSON.stringify([{"proName":"HugoInvest","proContents":["重构构建代码","调整图片上传功能，七牛CDN使用自定义域名"]},{"proName":"cbndweekly web","proContents":["weekly网站页面开发"]}]),
// });
// !function fetchDemo() {
//     fetch(req).then(function(response) {
//         console.log(response);
//         return response;
//     }).then(function(response) {
//         console.log(response);
//     });
// }()

// console.log('app.jsx --- start');
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
// console.log('app.jsx --- end');