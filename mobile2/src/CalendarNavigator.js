import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './CalendarScreen';
import CreateEntry from './CreateEntry';

export default createStackNavigator(
  {
    calendar: {screen: CalendarScreen},
    createEntry: {screen: CreateEntry},
  },
  {
    initialRouteName: 'calendar',
    headerMode: 'none',
    mode: 'modal',
  },
);
