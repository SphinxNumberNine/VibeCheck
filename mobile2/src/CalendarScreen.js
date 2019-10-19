import React, {Component} from 'react';
import {CalendarList} from 'react-native-calendars';

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    // get days with entry
  }

  render() {
    return (
      <CalendarList
        markedDates={{
          '2019-05-20': {
            textColor: 'green',
            startingDay: true,
            endingDay: true,
          },
          '2019-05-22': {color: 'green', startingDay: true, endingDay: true},
          '2019-05-23': {
            selected: true,
            color: '#108752',
            textColor: 'white',
            startingDay: true,
            endingDay: true,
          },
          '2019-05-04': {
            disabled: true,
            startingDay: true,
            color: 'green',
            endingDay: true,
          },
        }}
        markingType={'period'}
        pastScrollRange={24}
        futureScrollRange={24}
      />
    );
  }
}
