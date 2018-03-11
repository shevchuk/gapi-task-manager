import { combineReducers } from 'redux'
import {
    REQUEST_TASKSLIST,
    RECEIVE_TASKSLIST,
    SELECT_TASKLIST,
    REQUEST_TASKS,
    RECEIVE_TASKS,
    RECEIVE_COMPLETE_TASK,
    REQUEST_COMPLETE_TASK,
    REQUEST_UNCOMPLETE_TASK,
    RECEIVE_UNCOMPLETE_TASK,
    REQUEST_UPDATE_TASK_TITLE,
    RECEIVE_UPDATE_TASK_TITLE,
    REQUEST_CREATE_TASK,
    RECEIVE_CREATE_TASK
} from '../actions/index'

function tasksLists(state = {
    isFetching: false,
    isLoadingTaskList: true,
    tasksLists: []
}, action) {
    switch (action.type) {
        case REQUEST_TASKSLIST:
            return Object.assign({}, state, {
                isLoadingTaskList: true,
                isFetching: true,
            });
        case RECEIVE_TASKSLIST:
            return Object.assign({}, state, {
                isFetching: false,
                isLoadingTaskList: false,
                tasksLists: action.tasksLists
            });
        case SELECT_TASKLIST:
            return Object.assign({}, state, {
                selectedTaskList: action.selectedTaskList
            });
        default:
            return state;
        }
}

function tasks(state = {
    isFetching: false,
    isToolbarVisible: false,
    tasks: []
}, action) {
    switch (action.type) {
        case REQUEST_TASKS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_TASKS:
            return Object.assign({}, state, {
                isFetching: false,
                tasks: action.tasks,
                isToolbarVisible: true,
            });
        case REQUEST_COMPLETE_TASK:
            return Object.assign({}, state, {
                isFetching: true,
                task: action.taskId,
                taskList: action.taskListId
            });
        case RECEIVE_COMPLETE_TASK:
            return Object.assign({}, state, {
                isFetching: true,
                task: action.task
            });
        case REQUEST_UNCOMPLETE_TASK:
            return Object.assign({}, state, {

            });
        case RECEIVE_UNCOMPLETE_TASK:
            return Object.assign({}, state, {
                
            });
        case REQUEST_UPDATE_TASK_TITLE:
            return Object.assign({}, state, {

            });
        case RECEIVE_UPDATE_TASK_TITLE:
            return Object.assign({}, state, {
                
            });
        case REQUEST_CREATE_TASK:
            return Object.assign({}, state, {

            });
        case RECEIVE_CREATE_TASK:
            return Object.assign({}, state, {
                
            });
        default:
            return state;
        }
}

const rootReducer = combineReducers({
    tasksLists,
    tasks
  })
  
export default rootReducer