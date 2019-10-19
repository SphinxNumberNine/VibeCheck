/**
 * @format
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

export default class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <App />
      </View>
    );
  }
}

AppRegistry.registerComponent(appName, () => SignUp);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
});
