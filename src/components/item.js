import React from 'react';

// console.log('item.js --- start');
export default class proItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
		};
	}
	render() {
		// console.log('item.js render');
		var task=this.props.itemData;
		if(this.state.editing || !task.proName){
			return(
				<div className="pro" ref={pro=>this.pro=pro} >
					<p className='title'>  
						<span>项目名称:<input type="text"  defaultValue={task.proName} /> </span>
						<span className="save" style={{background:'red'}} onClick={this.onSaveClick.bind(this)}>save</span>
						<span className="cancel" style={{background:'green'}} onClick={this.onCancelClick.bind(this)}>cancel</span>
						<span className="add" style={{background:'orange'}} onClick={this.onAddClick.bind(this)}>add</span>
					</p>
					{		
						task.proContents.map((item,index)=>
							<p key={index}> 
							 -  <input type='text'  defaultValue={item} />
							</p>
						)
					}
				</div>
			)
		}
		return(
			<div className="pro" ref={pro1=>this.pro1=pro1}>
				<p className='title'>  
					<span>项目名称:{ task.proName }</span>
					<span className="edit" style={{background:'red'}} onClick={this.onEditClick.bind(this)}>edit</span>
					<span className="del" style={{background:'green'}} onClick={this.onDelClick.bind(this)}>del</span>
				</p>
				{		
					task.proContents.map((item,index)=>
						<p key={index}> 
							-  {item} 
							 <span className='itemdel' style={{background:'green'}} onClick={this.onItemDelClick.bind(this)}>del</span>
						</p>
					)
				}
			</div>
		)

	}
	onEditClick() {
		this.setState({editing: true});
	}
	onCancelClick() {
		this.setState({editing: false});
	}
	onSaveClick(event) {
		// 验证数据
		var arrs=Array.from(this.pro.getElementsByTagName('input'));
		arrs.map((item)=> {
			if (item.value=='') {
				alert("请输入完整！");
				return;
			};
		});
		// 获取项目负责人名字、日期、tasks数据
		const {name, date, tasks, itemData, saveTask}=this.props;
		// 更新数据
		itemData.proName=arrs[0].value;
		var arr = arrs.slice(1).map((item)=> item.value);
		itemData.proContents=arr;
		saveTask();
		this.setState({ editing: false});
	}
	onAddClick(){
		// 获取项目负责人名字、日期、条目数据
		const {name, date, itemData, saveTask} = this.props;
		itemData.proContents.push('');
		// 通过saveTask更新
		saveTask();
	}
	onDelClick(event) {
		// 获取项目负责人名字、日期
		const {name, date, itemData, deleteTask} = this.props;
		deleteTask(name, date, itemData);
	}
	onItemDelClick(event){
		var ptext=event.target.parentNode.innerText;
		// 获取项目负责人名字、日期、条目数据
		const {name, date, itemData, saveTask} = this.props;
		// 筛选数据
		var arr = itemData.proContents.filter((item)=>ptext.indexOf(item)==-1);
		itemData.proContents=arr;
		// 通过saveTask更新数据
		saveTask();
	}
}

// console.log('item.js --- end');