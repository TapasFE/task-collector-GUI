import React from 'react';
import Navlink from './NavLink.js';

export default class TasdAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task:'',
      name:''
    };
  }
  render() {
    return (
      <div className='taskadd'>
        <label> 姓名: <input type="text" defaultValue={this.state.task} onChange={this.nameChange.bind(this)}/> </label>
        <br/>
        <textarea name="task" id="" cols="30" rows="10" placeholder='请输入内容...' defaultValue={this.state.name} onChange={this.taskChange.bind(this)}></textarea>
        <br/> 
        <Navlink to="/" onClick={this.onDataUpload.bind(this)} className='btn btn-default'>提交</Navlink>
      </div>
    );
  }
  nameChange(e) {
    this.state.name = e.target.value;
  }
  taskChange(e) {
    this.state.task = e.target.value;
  }
  onDataUpload(e) {
    let ok = confirm('您确认要提交？');
    if(!ok ){
      e.preventDefault();
      return;
    }
    if(!this.state.name || !this.state.task) alert('请输入完整！');
    var URL='http://localhost:4333/api/tasks';
    var req = new Request(URL, {
      method: 'POST', 
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:`user=${this.state.name}&content=${this.state.task}`,
      // body:`user=`+this.name.value+`&content=`+this.state.task,
    });
    fetch(req);
  }
}
