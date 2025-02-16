// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import { enableScreens } from 'react-native-screens';
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import AppNavigator from './app/navigation/AppNavigator';

enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
