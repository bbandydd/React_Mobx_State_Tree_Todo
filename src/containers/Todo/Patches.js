import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { onPatch, applyPatch } from 'mobx-state-tree';

@inject('TodoStore')
@observer
export default class Patches extends Component {
  static propTypes = {
    TodoStore: PropTypes.object,
  }

  @observable patches = observable.shallowArray();

  componentDidMount() {
    onPatch(
      this.props.TodoStore,
      (patch, inversePatch) => {
        this.patches.push({ patch, inversePatch });
      }
    );
  }

  reapply = (entry) => {
    applyPatch(this.props.TodoStore, entry.patch);
  }

  revert = (entry) => {
    applyPatch(this.props.TodoStore, entry.inversePatch);
  }

  render() {
    return (
      <div>
        {
          this.patches.map((entry, idx) => (
            <div key={idx}>
              <hr />
              <pre>{JSON.stringify(entry)}</pre>
              <button onClick={() => this.revert(entry)}>Invert apply</button>
              <button onClick={() => this.reapply(entry)}>Re apply</button>
            </div>
          ))
        }
      </div>
    );
  }
}
