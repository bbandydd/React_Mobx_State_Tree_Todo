import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('TodoStore')
@observer
export default class Todo extends Component {
  static propTypes = {
    TodoStore: PropTypes.object,
  }

  @observable newTodoTitle = '';

  @action
  handleChange = (e) => {
    this.newTodoTitle = e.target.value;
  }

  @action
  handleNewTodoClick = (e) => {
    e.stopPropagation();
    this.props.TodoStore.addTodo(this.newTodoTitle);
    this.newTodoTitle = "";
  };

  render() {
    const { TodoStore } = this.props;

    return (
      <div>
        <input value={this.newTodoTitle} onChange={this.handleChange} />
        <button onClick={this.handleNewTodoClick}>Add</button>
        <ul>
          {
            TodoStore.todos
              .values()
              .map((todo, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={todo.finished}
                    onClick={todo.toggle}
                  />
                  {todo.title}
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}
