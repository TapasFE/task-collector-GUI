import React from 'react';
import App from './app.jsx';
import NavLink from './NavLink';
import moment from 'moment';
// 数据格式
// const tasksList = { 
//   '小月':{
//     '2016,11,15':'昨日任务\n- AppStore审核跟踪\n- 修复老用户订阅BUG\n-面试筛选\n今日任务\n— 联合测试订阅部分\n— 准备新需求开发\n当前风险\n无',
//     // '2016,11,14':'123   \n 346',
//     // '2016,11,15':'123   \n 347',
//   },
//   '小凡':{
//     '2016,11,15':'昨日任务\n- 安卓线上bug汇总整理\n- cbndata测试点\n今日任务\n— bug验证，周刊问题基本结束\n— 继续cbndata测试点，需基本完成\n当前风险\n无',
//   },
// };
const tasksList={};

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tasksList
    }
  }
  render() {
    return (
      <div className='query'>
        <label> User:  <input type="text" defaultValue=''  ref={pro=>this.user=pro} /> </label>
        <label> Date:  <input type="text" defaultValue={moment().format('YYYY-MM-DD')}  ref={pro=>this.date=pro} /> </label>
        <a onClick={this.onQueryClick.bind(this)} className='btn btn-default'>query</a>
        <a href="/taskAdd"  className='btn btn-default'>任务添加</a>
        <App tasksList = {this.state.tasksList} />
      </div>
    );
  }
  componentDidMount() {
    let date = moment().format('YYYY-MM-DD');
    this.fetchData(null,date);
  }

  adapter (data){
    var tasksList={};
    // 转换成中间数据
    data.map((item,index)=> {
      let name = item.user.name;
      tasksList[name] = tasksList[name] || {};
      let date = moment(new Date(item.date)).format('YYYY,MM,DD');
      try{
        tasksList[name][date] = item.content;
        if(tasksList[name][date].indexOf('proName') != -1 || !tasksList[name][date]) throw Error('cuo wu ');
      }catch(err) {
        tasksList[name][date] = '- 我是缺省任务';
      }
    });
    return tasksList;
  }

  fetchData(user,date){
    var userQuery = '', dateQuery = '';
    if(user)userQuery+='user='+user;
    if(date)dateQuery+='&date='+date;
    var URL='/api/tasks?' + userQuery + dateQuery;
    // var URL='http://127.0.0.1:4333/api/tasks?'+query;
    var req = new Request(URL, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      }
    });
    var me = this;
    fetch(req).then(function(res) {
        return res.json();
    }).then(function(res) {
      me.setState({ tasksList: me.adapter(res.rows) });
    })
  }

  onQueryClick(){
    let user=this.user.value;
    let date=this.date.value;
    if(user && !date) date = moment().format('YYYY,MM,DD');
    this.fetchData(user,date);
  }
}
