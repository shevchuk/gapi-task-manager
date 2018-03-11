import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {initGAPI} from './api/gapi-transport';
import TasksList from './containers/TasksList';
import TodoList from './containers/TodoList';
import Toolbar from './containers/Toolbar';

import {
    fetchTasksLists, 
    selectTaskList, 
    requestTasksLists, 
    receiveTasksLists, 
    fetchTasks, 
    completeTask, 
    uncompleteTask, 
    updateTaskTitle,
    createTask
} from './actions/index';
import './css/main.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // initialize google api and request google task lists
    initGAPI(this.fetchTasksLists.bind(this));
  }

  fetchTasksLists() {
    this.props.dispatch(fetchTasksLists());
  }

  handleChange(taskList) {
    this.props.dispatch(selectTaskList(taskList));
    this.props.dispatch(fetchTasks(taskList));
  }

  onStatusChange(obj) {
    if (obj.checked) {
      this.props.dispatch(completeTask(obj.taskId, this.props.selectedTaskList));
    } else {
      this.props.dispatch(uncompleteTask(obj.taskId, this.props.selectedTaskList));
    }
  }

  onAddTodo() {
    this.props.dispatch(createTask(this.props.selectedTaskList));
  }

  onTaskTitleChange(obj) {
    this.props.dispatch(updateTaskTitle(obj.taskId, this.props.selectedTaskList, obj.newTitle));
  }

  render() {
    let {tasksLists, selectedTaskList, tasks, isLoadingTaskList, isToolbarVisible} = this.props;

    if (isLoadingTaskList) {
      return (
        <div className="jumbotron">
          <h3 className="app-loading">Connecting to google tasks API...</h3>
        </div>
      );
    } else {
      return (
        <div className="app">
          <TasksList 
            selectedTaskList={selectedTaskList} 
            tasksLists={tasksLists} 
            onChange={this.handleChange.bind(this)}/>
          <div className="app-tasks-wrapper">
            <Toolbar 
              isVisible={isToolbarVisible} 
              onAdd={this.onAddTodo.bind(this)}/>
            <TodoList 
              tasks={tasks} 
              onStatusChange={this.onStatusChange.bind(this)} 
              onTaskTitleChange={this.onTaskTitleChange.bind(this)}/>
          </div>
        </div>
      );
    }
  }
}

App.propTypes = {
  selectedTaskList: PropTypes.string.isRequired,
  tasksLists: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

App.defaultProps = {
  tasksLists: [],
  selectedTaskList: '',
  isLoadingTaskList: true,
  isToolbarVisible: false
}

function mapStateToProps(state) {
  return {
    selectedTaskList: state.tasksLists.selectedTaskList,
    tasksLists: state.tasksLists.tasksLists,
    isLoadingTaskList: state.tasksLists.isLoadingTaskList,
    isToolbarVisible: state.tasks.isToolbarVisible,
    tasks: state.tasks.tasks
  }
}

export default connect(mapStateToProps)(App)