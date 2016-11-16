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
const tasksList = {};

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList,
      user: '',
      date: moment().format('YYYY-MM-DD'),
    };
  }
  render() {
    return (
      <div className='query'>
        <label> User:  <input type="text" defaultValue={this.state.user} onChange={this.userChange.bind(this)} /> </label>
        <label> Date:  <input type="text" defaultValue={this.state.date} onChange={this.dateChange.bind(this)} /> </label>
        <a onClick={this.onQueryClick.bind(this)} className="btn btn-default" >query</a>
        <a href="/taskAdd"  className="btn btn-default" >任务添加</a>
        <App tasksList={this.state.tasksList} />
      </div>
    );
  }
  componentDidMount() {
    let date = moment().format('YYYY-MM-DD');
    this.fetchData(null,date);
  }

  adapter(data) {
    let tasksList = {};
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
    let arr = [];
    if(user)arr.push('user='+user);
    if(date)arr.push('&date='+date);
    let URL='/api/tasks?' + arr.join('');
    // let URL='http://127.0.0.1:4333/api/tasks?'+query;
    let req = new Request(URL, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      }
    });
    fetch(req).then(function (res) {
      return res.json();
    }).then((res)=> {
      this.setState({ tasksList: this.adapter(res.rows) });
    });
  }
  userChange(e) {
    this.state.user = e.target.value;
  }
  dateChange(e) {
    this.state.date = e.target.value;
  }
  onQueryClick(){
    let user = this.state.user;
    let date = this.state.date;
    if(user && !date) date = moment().format('YYYY,MM,DD');
    this.fetchData(user,date);
  }
}
