/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const APIClient = require('./src/Client');

global.APIClient = new APIClient('http://api.vibecheck.tech');

console.disableYellowBox;

export default class Index extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent(appName, () => Index);
