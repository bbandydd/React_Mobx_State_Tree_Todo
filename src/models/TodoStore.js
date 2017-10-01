import { types } from 'mobx-state-tree';

export const Todo = types
  .model('Todo', {
    id: types.identifier(types.number),
    title: types.string,
    finished: false,
  })
  .actions(self => ({
    toggle() {
      self.finished = !self.finished;
    },
  }));

export const TodoStore = types
  .model('TodoStore', {
    todos: types.map(Todo),
  })
  .views(self => ({
    get unfinishedTodoCount() {
      return self.todos.values().filter(todo => !todo.finished).length;
    }
  }))
  .actions(self => ({
    addTodo(title) {
      self.todos.put({ title, id: Math.random() });
    }
  }));
