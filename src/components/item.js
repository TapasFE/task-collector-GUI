import React from 'react';
export default class proItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
		};
	}
	render() {
		var task=this.props.itemData;
		if(this.state.editing || !task.proName){
			return(
				<div className="pro" ref={(pro)=>this.pro=pro} >
					<p className='title'>  
						<span>项目名称:<input type="text"  defaultValue={task.proName} /> </span>
						<span className="save" style={{background:'red'}} onClick={this.onSaveClick.bind(this)}>save</span>
						<span className="cancel" style={{background:'green'}} onClick={this.onCancelClick.bind(this)}>cancel</span>
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
			<div className="pro" ref={(pro1)=>this.pro1=pro1}>
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
	getNameDateData(){
		return [this.props.task.name, this.props.data.date.join(''), this.props.itemData];
	}
	onEditClick() {
		this.setState({editing: true});
	}
	onCancelClick() {
		this.setState({editing: false});
	}
	onSaveClick(event) {
		// 获取项目负责人名字、日期、条目数据
		const [personname, date, itemData]=this.getNameDateData();
		var arrs=Array.from(this.pro.getElementsByTagName('input'));
		// 验证数据
		var invalid=arrs.some((item)=>item.value=='');
		if(invalid){
			alert("请输入完整！");
		}
		itemData.proName=arrs[0].value;

		var arr = arrs.slice(1).map((item)=>item.value);
		itemData.proContents=arr;
		this.props.saveTask(personname,date,itemData,itemData);
		this.setState({ editing: false});
	}
	onDelClick(event) {
		// 获取项目负责人名字、日期
		const [personname, date]=this.getNameDateData();
		this.props.deleteTask(personname,date,this.props.itemData);
	}
	onItemDelClick(event){
		var ptext=event.target.parentNode.innerText;
		// 获取项目负责人名字、日期、条目数据
		const [personname, date, itemData]=this.getNameDateData();
		// 筛选数据
		var arr = itemData.proContents.filter((item)=>ptext.indexOf(item)==-1);
		itemData.proContents=arr;
		// 可以用saveTask模拟
		this.props.saveTask(personname,date,itemData,itemData);

	}
}