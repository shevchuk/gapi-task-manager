import {signIn, loadTasks, patchTask, createNewTask} from '../api/gapi-transport';
export const REQUEST_TASKSLIST = 'REQUEST_TASKSLIST';
export const RECEIVE_TASKSLIST = 'RECEIVE_TASKSLIST';
export const SELECT_TASKLIST = 'SELECT_TASKLIST';
//export const TASKSLIST_FAILURE = 'TASKSLIST_FAILURE'

export const REQUEST_TASKS = 'REQUEST_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';

export const REQUEST_COMPLETE_TASK = 'REQUEST_COMPLETE_TASK';
export const RECEIVE_COMPLETE_TASK = 'RECEIVE_COMPLETE_TASK';

export const REQUEST_UNCOMPLETE_TASK = 'REQUEST_UNCOMPLETE_TASK';
export const RECEIVE_UNCOMPLETE_TASK = 'RECEIVE_UNCOMPLETE_TASK';

export const REQUEST_UPDATE_TASK_TITLE = 'REQUEST_UPDATE_TASK_TITLE';
export const RECEIVE_UPDATE_TASK_TITLE = 'RECEIVE_UPDATE_TASK_TITLE';

export const REQUEST_CREATE_TASK = 'REQUEST_CREATE_TASK';
export const RECEIVE_CREATE_TASK = 'RECEIVE_CREATE_TASK';

export const selectTaskList = (taskList) => {
    return {
        type: SELECT_TASKLIST,
        selectedTaskList: taskList
      }
}

export const requestCompleteTask = (taskId, taskListId) => {
    return {
        type: REQUEST_COMPLETE_TASK,
        taskId: taskId,
        taskListId: taskListId
    }
}

export const receiveCompleteTask = (result) => {
    return {
        type: RECEIVE_COMPLETE_TASK,
        task: result
    }
}

export const requestUncompleteTask = (taskId, taskListId) => {
    return {
        type: REQUEST_UNCOMPLETE_TASK,
        taskId: taskId,
        taskListId: taskListId
    }
}

export const receiveUncompleteTask = (result) => {
    return {
        type: RECEIVE_UNCOMPLETE_TASK,
        task: result
    }
}

export const requestTasksLists = () => {
    return {
        type : REQUEST_TASKSLIST
    }
}

export const receiveTasksLists = (result) => {
    return {
        type : RECEIVE_TASKSLIST,
        tasksLists: result.items
    }
}

export const fetchTasksLists = () => {
    return dispatch => {
        dispatch(requestTasksLists());
        return signIn().then((response) => {
            dispatch(receiveTasksLists(response.result));
            const firstTaskListId = response.result.items[0].id;
            
            dispatch(selectTaskList(firstTaskListId));
            dispatch(fetchTasks(firstTaskListId));
        })
    }
}

export const requestTasks = (taskList) => {
    return {
        type : REQUEST_TASKS,
        selectedTaskList: taskList
    }
}

export const receiveTasks = (result) => {
    return {
        type : RECEIVE_TASKS,
        tasks: result.items
    }
}

export const requestUpdateTaskTitle = (taskId, taskList, newTitle) => {
    return {
        type : REQUEST_UPDATE_TASK_TITLE,
        taskId: taskId,
        taskList: taskList,
        title: newTitle
    }
}

export const receiveUpdatedTaskTitle = (result) => {
    return {
        type : RECEIVE_UPDATE_TASK_TITLE,
        tasks: result
    }
}

export const requestCreateTask = (taskId, taskList, newTitle) => {
    return {
        type : REQUEST_CREATE_TASK,
        taskId: taskId,
        taskList: taskList,
        title: newTitle
    }
}

export const receiveCreateTask = (result) => {
    return {
        type : RECEIVE_CREATE_TASK,
        tasks: result
    }
}

export const createTask = (taskList) => {
    return dispatch => {
        dispatch(requestCreateTask(taskList));
        return createNewTask(taskList).then((response) => {
            dispatch(receiveCreateTask(response.result));
            dispatch(fetchTasks(taskList));
        })
    }
}

export const fetchTasks = (taskList) => {
    return dispatch => {
        dispatch(requestTasks(taskList));
        return loadTasks(taskList).then((response) => {
            dispatch(receiveTasks(response.result));
        })
    }
}

export const completeTask = (task, taskList) => {
    let obj = {
        status: "completed"
    }
    return dispatch => {
        dispatch(requestCompleteTask(task, taskList));
        return patchTask(task, taskList, obj).then((response) => {
            dispatch(receiveCompleteTask(response.result));
            dispatch(fetchTasks(taskList));
        })
    }
}

export const uncompleteTask = (task, taskList) => {
    let obj = {
        completed : null,
        status: "needsAction"
    }
    
    return dispatch => {
        dispatch(requestUncompleteTask(task, taskList));
        return patchTask(task, taskList, obj).then((response) => {
            dispatch(receiveUncompleteTask(response.result));
            dispatch(fetchTasks(taskList));
        })
    }
}

export const updateTaskTitle = (task, taskList, newTitle) => {
    return dispatch => {
        dispatch(requestUpdateTaskTitle(task, taskList, newTitle));
        return patchTask(task, taskList, {title: newTitle}).then((response) => {
            dispatch(receiveUpdatedTaskTitle(response.result));
            dispatch(fetchTasks(taskList));
        })
    }
}