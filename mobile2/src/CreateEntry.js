import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  StatusBar,
} from 'react-native';

const x = 'darkblue';

photo = require(`../assets/images/${x}.jpg`);

export default class CreateEntry extends Component {
  render() {
    return (
      <View style={{height: '100%'}}>
        <StatusBar hidden />
        <Image source={photo} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    maxHeight: '25%',
    width: '100%',
    flexShrink: 0.5,
  },
});
