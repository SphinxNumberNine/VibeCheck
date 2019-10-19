import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

console.disableYellowBox = true;

import LoginScreen from './src/LoginScreen';
import Navigator from './src/TabNavigator';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

const App = createSwitchNavigator({
  login: {screen: LoginScreen},
  navigator: {screen: Navigator},
});

const AppContainer = createAppContainer(App);

export default AppContainer;
