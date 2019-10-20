import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './CalendarScreen';
import CreateEntry from './CreateEntry';
import ListForums from './ListForums';

export default createStackNavigator(
  {
    calendar: {screen: CalendarScreen},
    createEntry: {screen: CreateEntry},
    forumsList: {screen: ListForums},
  },
  {
    initialRouteName: 'calendar',
    headerMode: 'none',
    mode: 'modal',
  },
);
