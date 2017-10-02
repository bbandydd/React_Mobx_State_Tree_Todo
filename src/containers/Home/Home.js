import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Counter from '../Counter';
import Todo from '../Todo';
import './Home.less';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="menu">
          <Link to="/">Counter</Link>
          <Link to="/todo">Todo</Link>
        </div>
        <div>
          <Route exact path="/" component={Counter}/>
          <Route path="/todo" component={Todo}/>
        </div>
      </div>
    );
  }
}
