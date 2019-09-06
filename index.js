import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Root} from 'native-base';
import AppContainer from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import store from './src/redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
