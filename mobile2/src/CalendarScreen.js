import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import Modal, {ModalContent} from 'react-native-modals';
import ColorPalette from 'react-native-color-palette';
export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    // get days with entry

    this.state = {
      modalVisible: false,
      color: false,
    };
  }

  render() {
    return (
      <SafeAreaView>
        <CalendarList
          maxDate={Date()}
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
          futureScrollRange={0}
          onDayPress={day => this.setState({modalVisible: true})}
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
                    this.props.navigation.navigate('createEntry'),
                  );
                }}>
                <View
                  style={
                    this.state.color
                      ? styles.enabledButton
                      : styles.disabledButton
                  }>
                  <Text>Submit</Text>
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
