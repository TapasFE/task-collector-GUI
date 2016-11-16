import React from 'react';
import TasksList from './tasks-list.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Tasks List2</h1>
        { this.createTaskList() }
      </div>
    );
  }
  createTaskList(){
    let lists = this.props.tasksList;
    return Object.keys(lists).map((name)=>{
      let tasks = lists[name];
      return <TasksList 
        key = {name}
        data = {tasks} 
        name = {name}
        {...this.props}
      />;
    });
  }
}
