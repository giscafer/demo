/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-04-04 22:30:26
 * @description: Context API demo
 */

import React, { Component } from 'react';
import './LocaleSample.css';

const enStrings = {
  submit: 'Submit',
  cancel: 'Cancel',
};

const cnStrings = {
  submit: '提交',
  cancel: '取消',
};

const LocaleContext = React.createContext(enStrings);

class LocaleProvider extends Component {
  state = { locale: cnStrings };

  toggleLocale = () => {
    const locale = this.state.locale === enStrings ? cnStrings : enStrings;

    this.setState({
      locale,
    });
  };

  render() {
    return (
      <LocaleContext.Provider value={this.state.locale}>
        <button onClick={this.toggleLocale}> 切换语言</button>
        {this.props.children}
      </LocaleContext.Provider>
    );
  }
}

class LocaleButtons extends Component {
  render() {
    return (
      <LocaleContext.Consumer>
        {/* 得到 Provider 的 value值，通过函数组件展示 */}
        {(locale) => (
          <div>
            <button>{locale.submit}</button>&nbsp;&nbsp;
            <button>{locale.cancel}</button>
          </div>
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default () => (
  <div>
    <LocaleProvider>
      <div>
        <br />
        <LocaleButtons />
      </div>
    </LocaleProvider>
  </div>
);
