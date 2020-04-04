import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './TabSelector.css';

export default class TabSelector extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    children: PropTypes.func, // 函数子组件 觉得内容展示方式
  };

  static defaultProps = {
    value: null,
    options: [],
    onChange: () => {},
    children: () => {},
  };

  render() {
    return (
      <div className='tab-selector'>
        <ul>
          {this.props.options.map((opt) => (
            <li
              key={opt.value}
              className={`tab-item ${
                opt.value === this.props.value ? 'selected' : ''
              }`}
              onClick={() => this.props.onChange(opt.value)}
            >
              {opt.name}
            </li>
          ))}
        </ul>
        {this.props.value && this.props.children(this.props.value)}
      </div>
    );
  }
}
