import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import Modal, {ModalContent} from 'react-native-modals';
import ColorPalette from 'react-native-color-palette';

var calendarInput = {};

var serverEntries;

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    let currentComponent = this;

    setInterval(() => {
      currentComponent.setState({testing: 'yuh'});
    }, 500);

    this.props.navigation.addListener('willFocus', async result => {
      var entriesResp = await global.APIClient.getEntries();
      serverEntries = entriesResp.body.entries;
      console.log('ENTRIES RESP ' + JSON.stringify(entriesResp, null, 4));
      calendarInput = {};
      try {
        for (let entry of entriesResp.body.entries) {
          let date = entry.date.split('/');
          let calendarDate = [
            date[2],
            date[0].length == 1 ? '0' + date[0] : date[0],
            date[1].length == 1 ? '0' + date[1] : date[1],
          ].join('-');
          calendarInput[calendarDate] = {
            color: entry.color,
            startingDay: true,
            endingDay: true,
            disabled: true,
            disableTouchEvent: true,
          };
        }

        let tipData = currentComponent.props.navigation.state.params.tipData;

        console.log('UHHHH: ' + JSON.stringify(tipData));

        if (tipData) {
          Alert.alert(tipData.title, tipData.tip);
        }
      } catch (err) {}

      currentComponent.setState({finishedCalendar: true}, () => {
        console.log('state change');
      });
    });

    // get days with entry
    global.APIClient.getEntries().then(entriesResp => {
      console.log('ENTRIES ' + JSON.stringify(entriesResp, null, 4));
    });

    this.state = {
      modalVisible: false,
      color: false,
    };
  }

  render() {
    return (
      <SafeAreaView>
        <CalendarList
          markedDates={calendarInput}
          maxDate={Date()}
          markingType={'period'}
          pastScrollRange={24}
          futureScrollRange={0}
          onDayPress={day => {
            let foundDate = null;
            let dateFound = false;
            for (entry of serverEntries) {
              if (entry.date == day.month + '/' + day.day + '/' + day.year) {
                dateFound = true;
                foundDate = entry;
                break;
              }
            }

            if (!dateFound) {
              this.setState({modalVisible: true, day});
            } else {
              this.props.navigation.navigate('viewPrivateEntry', { foundDate });
            }
          }}
        />
        <Modal
          visible={this.state.modalVisible}
          onTouchOutside={() => {
            this.setState({modalVisible: false});
            this.setState({color: false});
          }}>
          <ModalContent>
            <View style={{alignContent: 'center', alignItems: 'center'}}>
              <Text>How's Your Mood?</Text>
              <ColorPalette
                onChange={color => this.setState({color})}
                colors={[
                  '#ff7040',
                  '#ffc266',
                  '#ffff66',
                  '#71da71',
                  '#3399ff',
                  '#cc99ff',
                  '#000066',
                ]}
                title={''}
              />
              <TouchableOpacity
                disabled={!this.state.color}
                onPress={() => {
                  this.setState({modalVisible: false}, () =>
                    this.props.navigation.navigate('createEntry', {
                      day: this.state.day,
                      color: this.state.color,
                    }),
                  );
                }}>
                <View
                  style={
                    this.state.color
                      ? styles.enabledButton
                      : styles.disabledButton
                  }>
                  <Text>Create Diary Entry</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ModalContent>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  enabledButton: {
    width: 325,
    borderColor: '#000000',
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderRadius: 24,
    marginTop: 20,
    backgroundColor: '#F5F6F7',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
  },
  disabledButton: {
    width: 325,
    borderColor: '#000000',
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderRadius: 24,
    marginTop: 20,
    backgroundColor: '#F5F6F7',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textShadowColor: '#BBBDBB',
  },
});
