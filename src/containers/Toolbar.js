import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Toolbar extends Component {
    render() {
        if (this.props.isVisible) {
            return (
                <div className="app-tasks-todo-toolbar">
                    <button onClick={this.props.onAdd} type="button" className="btn btn-default" aria-label="Add">
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"> Add</span>
                    </button>
                </div>
            );
        } else {
            return null;
        }
    }
}

Toolbar.propTypes = {
    onAdd: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
}

export default Toolbar;

