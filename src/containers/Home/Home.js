import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { types } from 'mobx-state-tree';

const CountStore = types
  .model('Count', {
    number: 0,
  })
  .actions(self => ({
    increment() {
      self.number += 1;
    },
    decrement() {
      self.number -= 1;
    }
  }));

@inject('TodoStore')
@observer
export default class Home extends Component {
  static propTypes = {
    TodoStore: PropTypes.object,
  }

  @observable newTodoTitle = '';
  @observable countStore = CountStore.create();

  @action
  handleChange = (e) => {
    this.newTodoTitle = e.target.value;
  }

  handleNewTodoClick = (e) => {
    e.stopPropagation();
    this.props.TodoStore.addTodo(this.newTodoTitle);
    this.newTodoTitle = "";
  };

  render() {
    const { TodoStore } = this.props;

    return (
      <div>
        <div>
          {
            this.countStore.number
          }
          <button onClick={this.countStore.increment}>+</button>
          <button onClick={this.countStore.decrement}>-</button>
        </div>
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
                    { todo.title }
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
