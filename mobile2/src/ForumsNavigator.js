import {createStackNavigator} from 'react-navigation-stack';
import Forums from './Forums';
import EntriesList from './EntriesList';
import EntryScreen from './EntryScreen';

export default createStackNavigator(
  {
    forums: {screen: Forums},
    entries: {screen: EntriesList},
    entry: {screen: EntryScreen},
  },
  {
    initialRouteName: 'forums',
    headerMode: 'none',
    mode: 'modal',
  },
);
