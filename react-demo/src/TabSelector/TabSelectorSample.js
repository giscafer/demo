import React, { PureComponent } from 'react';
import TabSelector from './TabSelector';

const options = [
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Orange', value: 'orange' },
];
export default class TabSelectorSample extends PureComponent {
  state = {
    color: null,
  };

  render() {
    return (
      <div>
        Select color:
        <TabSelector
          options={options}
          value={this.state.color}
          onChange={(c) => this.setState({ color: c })}
        />
        <h2>{this.state.color}</h2>
      </div>
    );
  }
}
