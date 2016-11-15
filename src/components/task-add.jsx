import React from 'react';

export default class TasdAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task:''
    }
  }
  render() {
    return (
      <div className='taskadd'>
        <label> 姓名: <input type="text" defaultValue={this.state.task} /> </label>
        <br/>
        <textarea name="task" id="" cols="30" rows="10" placeholder='请输入内容...' ref={input=>this.input=input}></textarea>
        <br/> 
        <a href="/" onClick = {this.onDataUpload.bind(this)} className='btn btn-default'>提交</a>
      </div>
    );
  }
  onDataUpload(e) {
    let ok = confirm('您确认要提交？');
    if(!ok ){
      e.preventDefault();
      return;
    }
    var URL='http://localhost:4333/api/tasks';
    var req = new Request(URL, {
      method: 'POST', 
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:'user=${this.name.value}&content=${this.state.task}',
    });
    fetch(req);
  }
}
