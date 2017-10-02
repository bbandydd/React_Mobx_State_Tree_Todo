import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
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

@observer
export default class Counter extends Component {
  @observable countStore = CountStore.create();

  render() {
    return (
      <div>
        {
          this.countStore.number
        }
        <button onClick={this.countStore.increment}>+</button>
        <button onClick={this.countStore.decrement}>-</button>
      </div>
    );
  }
}
