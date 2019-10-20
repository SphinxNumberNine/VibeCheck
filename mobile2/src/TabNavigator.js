import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import CalendarNavigator from './CalendarNavigator';
import CalendarScreen from './CalendarScreen';

export default createMaterialBottomTabNavigator({
  Home: {screen: CalendarNavigator},
});
