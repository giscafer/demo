import React, { Component } from 'react';
import TabSelector from './TabSelector';
import './AdvanceTabSelectorSample.css';

const options = [
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Orange', value: 'orange' },
];

const animals = [
  { name: 'Tiger', value: 'tiger' },
  { name: 'Elephant', value: 'elephant' },
  { name: 'Cow', value: 'cow' },
];

export default class AdvanceTabSelectorSample extends Component {
  state = {
    color: null,
    aniaml: null,
  };
  render() {
    return (
      <div>
        <h1>组件设计：函数子组件</h1>
        <br />
        <br />
        <div>
          <h3>颜色展示</h3>
          <TabSelector
            options={options}
            value={this.state.color}
            onChange={(value) => this.setState({ color: value })}
          >
            {(color) => <div className={`rect ${color}`}></div>}
          </TabSelector>
        </div>
        <br />
        <br />
        <br />
        <div style={{ marginTop: '80px' }}>
          <h3>动物类型</h3>
          <TabSelector
            options={animals}
            value={this.state.animal}
            onChange={(c) => this.setState({ animal: c })}
          >
            {(animal) => (
              <div>
                <img width='100px' src={require(`../../images/${animal}.png`)} />
              </div>
            )}
          </TabSelector>
        </div>
      </div>
    );
  }
}
