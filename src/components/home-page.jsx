import React from 'react';
import App from './app.jsx';
import Develop from './home-develop.jsx';
import Test from './home-test.jsx';
import UI from './home-ui.jsx';
import NavLink from './NavLink';
import moment from 'moment';
// window.moment=moment;
// console.log(moment().subtract(1,'days').format('YYYY-MM-DD'),1212);
// const tasksList = { 
//   '小月':{
//     '2016,11,13':[
//       { 
//         proName:'cbndata web',
//         proContents:['编写通用组件','弹窗','轮播器','导航栏'],
//       },
//       {
//         proName:'cbndata page',
//         proContents:['优化弹窗组件在移动端的的显示效果和交互','编写报告列表页面'],
//       }
//       // {  
//       //  proName:'',
//       //  proContents:[''],
//       //  editing:false,
//       // }
//     ],
//     '2016,11,14':[
//       {
//         proName:'cbndata web1',
//         proContents:['编写通用组件1','弹窗1','轮播器1','导航栏1'],
//       },
//       {
//         proName:'cbndata page1',
//         proContents:['优化弹窗组件在移动端的的显示效果和交互1','编写报告列表页面1'],
//       }
//     ],
//     '2016,11,15':[
//       {
//         proName:'cbndata web2',
//         proContents:['编写通用组件2','弹窗2','轮播器2','导航栏2'],
//       },
//       {
//         proName:'cbndata page2',
//         proContents:['优化弹窗组件在移动端的的显示效果和交互2','编写报告列表页面2'],
//       }
//     ]
//   },
//   '小凡':{
//     '2016,11,13':[
//       {
//         proName:'HugoInvest1',
//         proContents:['重构构建代码1','调整图片上传功能，七牛CDN使用自定义域名1'],
//       },
//       {
//         proName:'cbndweekly web1',
//         proContents:['weekly网站页面开发1'],
//       }
//     ],
//     '2016,11,14':[
//       {
//         proName:'HugoInvest',
//         proContents:['重构构建代码','调整图片上传功能，七牛CDN使用自定义域名'],
//       },
//       {
//         proName:'cbndweekly web',
//         proContents:['weekly网站页面开发'],
//       }
//     ],
//     '2016,11,15':[
//       {
//         proName:'HugoInvest2',
//         proContents:['重构构建代码2','调整图片上传功能，七牛CDN使用自定义域名2'],
//       },
//       {
//         proName:'cbndweekly web2',
//         proContents:['weekly网站页面开发2'],
//       }
//     ]
//   },
//   '小天':{
//     '2016,11,13':[
//       {
//         proName:'CBNWeeklyCMS',
//         proContents:['短信接口模板调研','pdf转图片服务重构 40%'],
//       },
//       {
//         proName:'cbnweekly share',
//         proContents:['cbndata web 接入短信服务'],
//       }
//     ],
//     '2016,11,14':[
//       {
//         proName:'HugoWriterServer',
//         proContents:['筛选简历','根据上线反馈问题及时排查修复'],
//       },
//       {
//         proName:'HugoInvest',
//         proContents:['解决反馈的bug'],
//       }
//     ],
//     '2016,11,15':[
//       {
//         proName:'CBNWeeklyCMS',
//         proContents:['编写组件','探底加载','回到顶部','做些行业调查'],
//       },
//       {
//         proName:'cbndata web',
//         proContents:['整理Invest项目计划','编写活动列表页面'],
//       }
//     ]
//   }
// };
const tasksList={};
window.data = {};
// // 中间数据，目标数据
// {
//   '小凡':{
//     '2016,11,10':'jsonobj',
//     '2016,11,11':'jsonobj'
//   },
//   '小月':{
//     '2016,11,10':'jsonobj',
//     '2016,11,11':'jsonobj'
//   },
// }
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tasksList
    }
  }
  render() {
    console.log('home-page render');
    return (
      <div className='query'>
        <label> user: <input type="text" defaultValue=''  ref={pro=>this.user=pro} /> </label>
        <label> date: <input type="text" defaultValue='2016-11-11'  ref={pro=>this.date=pro} /> </label>
        <button onClick={this.onQueryClick.bind(this)}>query</button>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex >Develop</NavLink></li>
          <li><NavLink to="/test">Test</NavLink></li>
          <li><NavLink to="/ui">UI</NavLink></li>
        </ul>
        {
          this.props.children && React.cloneElement(this.props.children, {
            tasksList : this.state.tasksList,
            createTask : this.createTask.bind(this),
            saveTask : this.saveTask.bind(this),
            deleteTask : this.deleteTask.bind(this),
            deleteTaskItem : this.deleteTask.bind(this)
          })
        }

      </div>
    );
  }
  // <Develop>
  //   <App 
  //     tasksList = {this.state.tasksList} 
  //     createTask = {this.createTask.bind(this)} 
  //     saveTask = {this.saveTask.bind(this)}
  //     deleteTask ={ this.deleteTask.bind(this)}
  //     deleteTaskItem = {this.deleteTask.bind(this)}
  //   />
  // </Develop>
  // <Test
  //     tasksList = {this.state.tasksList} 
  //     createTask = {this.createTask.bind(this)} 
  //     saveTask = {this.saveTask.bind(this)}
  //     deleteTask ={ this.deleteTask.bind(this)}
  //     deleteTaskItem = {this.deleteTask.bind(this)}
  // />

  // <UI
  //     tasksList = {this.state.tasksList} 
  //     createTask = {this.createTask.bind(this)} 
  //     saveTask = {this.saveTask.bind(this)}
  //     deleteTask ={ this.deleteTask.bind(this)}
  //     deleteTaskItem = {this.deleteTask.bind(this)}
  // />

  // render((
  //   <Router history={hashHistory}>
  //     <Route path="/" component={App}>
  //       <Route path="/repos" component={Repos}/>
  //       <Route path="/about" component={About}/>
  //     </Route>
  //   </Router>
  // ), document.getElementById('app'))


  createTask(name,date) {
    let tasks = this.state.tasksList[name][date];
    if(tasks){
      tasks.push({
        proName:'',
        proContents:[''],
      })
    }else{
      tasks = [{
          proName:'',
          proContents:[''],
      }];
    }
    this.setState({ tasksList: this.state.tasksList});
  }

  saveTask() {
    this.setState({ tasksList: this.state.tasksList});
  }

  deleteTask(name, date, oldTask) {
    _.remove(this.state.tasksList[name][date], task=> task === oldTask);
    this.setState({ tasksList: this.state.tasksList});
  }

  adapter (data){
    var tasksList={};
    // 转换成中间数据
    data.map((item,index)=> {
      let name = item.user.name;
      tasksList[name] = tasksList[name] || {};
      let date = moment(new Date(item.date)).format('YYYY,MM,DD');
      try{
        tasksList[name][date] = JSON.parse(item.content);
        if(typeof tasksList[name][date] != 'object' || !tasksList[name][date]) throw Error('cuo wu ');
      }catch(err) {
        tasksList[name][date] = [
          { 
            proName:'cbndata web',
            proContents:['编写通用组件','弹窗','轮播器','导航栏'],
          },
          {
            proName:'cbndata page',
            proContents:['优化弹窗组件在移动端的的显示效果和交互','编写报告列表页面'],
          }
        ];
      }
    });
    return tasksList;
  }

  fetchData(user,date){
    var userQuery = '', dateQuery = '', date1Query = '';
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
    if(date)date1Query+='&date=' + moment(new Date(date)).subtract(1,'days').format('YYYY,MM,DD');
    var URL1 = '/api/tasks?' + userQuery + date1Query;
    var req1 = new Request(URL1, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      }
    });

    var me = this;
    fetch(req).then(function(res) {
        return res.json();
    }).then(function(res) {
      // 今日数据
      window.data.tasksList1 = me.adapter(res.rows);
      return fetch(req1);
    }).
    then(function (res) {
      return res.json();
    }).then(function(res){
      // 昨日数据
      window.data.tasksList2 = me.adapter(res.rows);
      _.map(window.data.tasksList1, function(tasks, key){
        if(window.data.tasksList2[key]){
          _.merge(tasks,window.data.tasksList2[key])
        }
      });
      me.setState({ tasksList: window.data.tasksList1 });
    });
  }

  // var URL='/api/tasks?date=2016-11-11';
  // var req = new Request(URL, {
  //     method: 'GET',
  //     mode: 'no-cors',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type':'application/json'
  //     }
  // });
  // !function fetchDemo() {
  //     fetch(req).then(function(response) {
  //       return response.json();
  //     }).then(function(response) {
  //       console.log(response);
  //       console.log(adapter(response.rows));

  //     });
  // }()

  onQueryClick(){
    let user=this.user.value;
    let date=this.date.value;
    if(user && !date) date = moment().format('YYYY,MM,DD');
    this.fetchData(user,date);
  }
}
