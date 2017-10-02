import React from 'react';
import { Provider } from 'mobx-react';
// import package
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import 'ress/dist/ress.min.css';

// import relative path
import Home from './Home';

// import store
import { TodoStore } from '../models/TodoStore';

const todoStore = TodoStore.create({
  todos: {}
});

const Main = () => (
  <Provider TodoStore={todoStore}>
    <Router>
      <Switch>
        <Home />
      </Switch>
    </Router>
  </Provider>
);

export default Main;
