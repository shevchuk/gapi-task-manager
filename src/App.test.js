import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from './actions/index';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import reducer from './reducers/reducers'
import TodoList from './containers/TodoList'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to add a new task', () => {
    const title = 'Feed the cat';
    const expectedAction = {
        type : actions.REQUEST_CREATE_TASK,
        taskId: 333,
        taskList: 555,
        title: title
    }

    expect(actions.requestCreateTask(333,555,title)).toEqual(expectedAction);
  });
});

describe('async actions', () => {

  it('creates RECEIVE_CREATE_TASK when task has been created', () => {
    window.gapi ={
      client: {
        tasks: {
          tasks: {
            list: () => {
              return new Promise((resolve) => {
                resolve({result : {items: []}});
              })
            },
            insert: (obj) => {
              return new Promise((resolve) => {
                const response = '{"response": {"result":{"kind":"tasks#task","id":"MTA0NzE0NzYxODg2NDg4NzIxMDA6MDowODIyNTQ1OTUyNzA0NTAw","etag":"Ab2xPghAs4lqrMkOhg7IdzpAa48/MTE0NjA2ODIzMA","title":"","updated":"2018-03-10T22:30:02.000Z","selfLink":"https://www.googleapis.com/tasks/v1/lists/MTA0NzE0NzYxODg2NDg4NzIxMDA6MDow/tasks/MTA0NzE0NzYxODg2NDg4NzIxMDA6MDowODIyNTQ1OTUyNzA0NTAw","position":"00000000001288490187","status":"needsAction"},"body":{"kind": "tasks#task","id": "MTA0NzE0NzYxODg2NDg4NzIxMDA6MDowODIyNTQ1OTUyNzA0NTAw","etag": "Ab2xPghAs4lqrMkOhg7IdzpAa48/MTE0NjA2ODIzMA","title": "", "updated": "2018-03-10T22:30:02.000Z","selfLink": "https://www.googleapis.com/tasks/v1/lists/MTA0NzE0NzYxODg2NDg4NzIxMDA6MDow/tasks/MTA0NzE0NzYxODg2NDg4NzIxMDA6MDowODIyNTQ1OTUyNzA0NTAw","position": "00000000001288490187","status": "needsAction"},"headers":{"pragma":"no-cache","date":"Sat, 10 Mar 2018 22:30:02 GMT","content-encoding":"gzip","server":"GSE","etag":"Ab2xPghAs4lqrMkOhg7IdzpAa48/MTE0NjA2ODIzMA","content-type":"application/json; charset=UTF-8","vary":"Origin, X-Origin","cache-control":"no-cache, no-store, max-age=0, must-revalidate","content-length":"272","expires":"Mon, 01 Jan 1990 00:00:00 GMT"},"status":200,"statusText":null}}';
                
                resolve(JSON.parse(response));
              });
            }
          }
        }
      }
    }
    
    const expectedActions = { type: actions.RECEIVE_CREATE_TASK, "tasks" : undefined};

    const store = mockStore();

    return store.dispatch(actions.createTask(333)).then(() => {
      const storeActions = store.getActions();

      expect(storeActions).toContainEqual(expectedActions);
    });
  
  });
});

describe('reducers', () => {
  it('should handle REQUEST_COMPLETE_TASK', () => {
    expect(
      reducer({}, {
        type: actions.REQUEST_COMPLETE_TASK,
        taskId: 333,
        taskListId: 5555
      })).toMatchObject({
          tasks: {
            isFetching: true,
            task: 333,
            taskList: 5555
          }
      });
  });
});

function setup() {
  const props = {
    tasks: [
      {
        id: 1,
        status: 'completed',
        title: 'ABC',
        notes: ''
      },
      {
        id: 2,
        status: 'completed',
        title: 'XYZ',
        notes: ''
      }
    ],
    onStatusChange: jest.fn(),
    onTaskTitleChange: jest.fn()
  }
 
  const enzymeWrapper = mount(<TodoList {...props} />)
 
  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('TodoList', () => {
    it('should render main wrapper', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find('div.app-tasks')).toHaveLength(1);
    });

    it('should render multiple items', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find('.app-tasks-todo-item')).toHaveLength(2);
    })
  });
});