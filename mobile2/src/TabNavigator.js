import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import CalendarNavigator from './CalendarNavigator';
import CalendarScreen from './CalendarScreen';
import Forums from './Forums';

import ForumsNavigator from './ForumsNavigator';

export default createMaterialBottomTabNavigator(
  {
    Home: {
      screen: CalendarNavigator,
    },
    Forums: {screen: ForumsNavigator},
  },
  {
    barStyle: {backgroundColor: '#788DD5', paddingBottom: 0},
    labelStyle: {
      color: 'white',
      fontWeight: 'normal',
    },
  },
);
