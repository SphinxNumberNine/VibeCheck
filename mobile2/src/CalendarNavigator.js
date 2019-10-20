import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './CalendarScreen';
import CreateEntry from './CreateEntry';
import ListForums from './ListForums';
import ViewPrivateEntry from './ViewPrivateEntry';

export default createStackNavigator(
  {
    calendar: {screen: CalendarScreen},
    createEntry: {screen: CreateEntry},
    forumsList: {screen: ListForums},
    viewPrivateEntry: {screen: ViewPrivateEntry}
  },
  {
    initialRouteName: 'calendar',
    headerMode: 'none',
    mode: 'modal',
  },
);
