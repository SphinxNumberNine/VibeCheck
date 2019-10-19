import React from 'react';
import {Text} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createAppContainer} from 'react-navigation';
import CalendarScreen from './CalendarScreen';
import LoginScreen from './LoginScreen';

class Dummy extends React.Component {
  render() {
    return <Text>Text</Text>;
  }
}

export default createMaterialBottomTabNavigator(
  {
    calendar: {screen: LoginScreen},
  },
  {
    initialRouteName: 'calendar',
  },
);
