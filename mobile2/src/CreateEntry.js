import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal, {ModalContent} from 'react-native-modals';

const photos = require('./ImageImporter');

var photo;

export default class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    let randomNum = Math.floor(Math.random() * 3) + 1;
    var colorString = '';

    let color = this.props.navigation.state.params.color;

    console.log('COLOR ' + color);

    switch (color) {
      case '#ff7040':
        photo = photos['red' + randomNum];
        colorString = 'red' + randomNum;
        break;
      case '#ffc266':
        photo = photos['orange' + randomNum];
        colorString = 'orange' + randomNum;
        break;
      case '#ffff66':
        photo = photos['yellow' + randomNum];
        colorString = 'yellow' + randomNum;
        break;
      case '#71da71':
        photo = photos['green' + randomNum];
        colorString = 'green' + randomNum;
        break;
      case '#3399ff':
        photo = photos['lightblue' + randomNum];
        colorString = 'lightblue' + randomNum;
        break;
      case '#cc99ff':
        photo = photos['darkblue' + randomNum];
        colorString = 'darkblue' + randomNum;
        break;
      case '#000066':
        photo = photos['pink' + randomNum];
        colorString = 'pink' + randomNum;
        break;
    }

    this.state = {
      day: this.props.navigation.state.params.day.day,
      month: this.props.navigation.state.params.day.month,
      year: this.props.navigation.state.params.day.year,
      modalVisible: false,
      title: '',
      image: colorString,
      content: '',
      color: this.props.navigation.state.params.color,
    };
    console.log('PROPS DAY' + JSON.stringify(this.props));
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emailContainer}>
          <TextInput
            selectionColor="black"
            placeholder={'Title'}
            editable={true}
            label="Title"
            style={styles.textInput}
            onChangeText={title => this.setState({title})}></TextInput>
        </View>
        <View style={styles.dateContainer}>
          <Text style={{fontFamily: 'Georgia'}}>
            {this.state.month.toString()}
            {'/'}
            {this.state.day.toString()}
            {'/'}
            {this.state.year.toString()}
          </Text>
        </View>
        <Image source={photo} style={styles.image} />
        <View style={styles.diarycontainer}>
          <TextInput
            multiline={true}
            selectionColor="black"
            placeholder={"What's on your mind?"}
            editable={true}
            label="What's on your mind?"
            style={styles.diary}
            onChangeText={content => this.setState({content})}></TextInput>
        </View>
        <TouchableOpacity
          style={{alignItems: 'center', alignContent: 'center'}}
          onPress={() => this.setState({modalVisible: true})}>
          <View style={styles.button}>
            <Text>Submit</Text>
          </View>
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          onTouchOutside={() => {
            this.setState({modalVisible: false});
          }}>
          <ModalContent>
            <Text style={{fontSize: 16, fontFamily: 'Georgia'}}>
              How do you wish to save this entry?
            </Text>
            <TouchableOpacity
              style={{alignItems: 'center', alignContent: 'center'}}
              onPress={() => {
                this.saveAsPublic();
              }}>
              <View style={styles.optionButton}>
                <Text>Public</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.saveAsPrivate()}
              style={{alignItems: 'center', alignContent: 'center'}}>
              <View style={styles.optionButton}>
                <Text>Private</Text>
              </View>
            </TouchableOpacity>
          </ModalContent>
        </Modal>
      </SafeAreaView>
    );
  }

  async saveAsPrivate() {
    var dateString =
      this.state.month + '/' + this.state.day + '/' + this.state.year;
    let privateResp = await global.APIClient.addEntry(
      this.state.title,
      this.state.content,
      dateString,
      this.state.color,
      this.state.image,
    );

    let {tipData} = privateResp.body;
    console.log('TIP Data: ' + JSON.stringify(tipData));

    this.setState({modalVisible: false}, () => {
      this.props.navigation.navigate('calendar', {tipData});
    });
  }

  async saveAsPublic() {
    var dateString =
      this.state.month + '/' + this.state.day + '/' + this.state.year;
    let publicResp = await global.APIClient.addEntry(
      this.state.title,
      this.state.content,
      dateString,
      this.state.color,
      this.state.image,
    );

    console.log('ID:: ' + publicResp.body.entry._id);

    this.setState({modalVisible: false}, () => {
      this.props.navigation.navigate('forumsList', {
        id: publicResp.body.entry._id,
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    marginTop: '20%',
    height: '95%',
  },
  image: {
    maxHeight: '30%',
    width: '100%',
    flexShrink: 0.5,
    marginTop: '0%',
    marginBottom: '5%',
  },
  titleField: {
    alignItems: 'center',
  },
  textInput: {
    color: '#000000',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
  },
  emailContainer: {
    marginLeft: '3%',
    width: 325,
    borderColor: '#000000',
    borderWidth: 0,
    height: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  dateContainer: {
    marginLeft: '3%',
    width: 325,
    borderColor: '#000000',
    borderWidth: 0,
    height: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  diarycontainer: {
    marginLeft: '3%',
    width: 385,
    borderColor: '#000000',
    borderWidth: 0,
    height: 310,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  diary: {
    color: '#000000',
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'Georgia',
  },
  button: {
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
  optionButton: {
    width: 200,
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
  },
});
