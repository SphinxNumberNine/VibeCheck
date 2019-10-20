/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox;

export default class Index extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent(appName, () => Index);
