import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/lib/ListGroup';

class TasksList extends Component {
    handleClick(self) {
        return (e) => {
            let data = e.target.getAttribute('data-tasklist');
            self.props.onChange(data);
        }
    }

    getBadgeForDefault(index) {
        if (index === 0) {
            return (
                <span className="badge">Default</span>
            );
        }
    }

    render() {
        if (this.props.tasksLists === undefined) {
            return null;
        }
        
        return (
            <div className="app-tasks-lists">
                <ListGroup>
                    {this.props.tasksLists.map((item, i) => {
                        return (
                            <span
                                key={item.id}
                                data-tasklist={item.id} 
                                className={this.getTaskListLinkClass(item)}
                                onClick={this.handleClick(this)}>{item.title}{this.getBadgeForDefault(i)}</span>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }
    getTaskListLinkClass(item) {
        let classname = 'list-group-item';
    
        if (item.id === this.props.selectedTaskList) {
            classname += ' active';
        }
    
        return classname;
    }
}


TasksList.propTypes = {
    onChange: PropTypes.func.isRequired,
    tasksLists: PropTypes.array.isRequired,
    selectedTaskList: PropTypes.any
}

export default TasksList;