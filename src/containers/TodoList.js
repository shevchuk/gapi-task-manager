import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import PropTypes from 'prop-types';
import ClickToEdit from '../contrib/click-to-edit/ClickToEdit'

class TodoList extends Component {
    onTaskStatusClick(self) {
        // todo - replace with bind(this)
        return (cb) => {
            let taskId = cb.target.getAttribute('data-task');
            let checked = cb.target.checked;
    
            self.props.onStatusChange({taskId, checked});
        }
    }

    getTaskClassname(item) {
        let className = 'list-group-item-heading ';

        if (item.status === "completed") {
            className += 'app-tasks-todo-item-title-completed ';
        } 

        return className;
    }

    getTaskNoteClassname(item) {
        let className = 'list-group-item-text small ';

        if (item.status === "completed") {
            className += 'app-tasks-todo-item-title-completed ';
        } 

        return className;
    }

    onTaskEdit(item, value) {
        this.props.onTaskTitleChange({taskId: item.id, newTitle: value});
    }

    render() {
        
        return (
            <div className="app-tasks">
                <ListGroup>
                    {this.props.tasks.map((item) => {
                        return (
                            <div key={item.id} className="row app-tasks-todo-item">
                                <div className="col-xs-1"> 
                                    <input 
                                        id={`checkbox-${item.id}`}
                                        data-task={item.id} 
                                        defaultChecked={item.status === 'completed'}
                                        type="checkbox" 
                                        onChange={this.onTaskStatusClick(this)} />
                                </div>
                                <div className="col-xs-11">
                                    <a href="#"    
                                        data-tasklist={item.id} 
                                        >
                                        <ClickToEdit
                                            customStyle={this.getTaskClassname(item)}
                                            endEditing={this.onTaskEdit.bind(this, item)}>
                                            {item.title? item.title : '<Empty>'}
                                        </ClickToEdit>
                                    </a>
                                    <p className={this.getTaskNoteClassname(item)}>{item.notes}</p>
                                </div>
                            </div>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }
}


TodoList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onTaskTitleChange: PropTypes.func.isRequired
}


export default TodoList;
