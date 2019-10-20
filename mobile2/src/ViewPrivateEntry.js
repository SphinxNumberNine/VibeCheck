import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const photos = require('./ImageImporter');

export default class ViewPrivateEntry extends Component {
  constructor(props) {
    super(props);
    console.log('PRIVATE:: ' + JSON.stringify(props.navigation.state.params));
    var data = props.navigation.state.params.foundDate;
    this.state = {
      content: data.content,
      date: data.date,
      image: data.image,
      title: data.title,
      color: data.color,
      comments: data.comments,
      userComment: '',
    };
  }

  render() {
    const photo = photos[this.state.image];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emailContainer}>
          <TextInput
            value={this.state.title}
            selectionColor="black"
            placeholder={'Title'}
            editable={false}
            label="Title"
            style={styles.textInput}></TextInput>
        </View>
        <View style={styles.dateContainer}>
          <Text style={{fontFamily: 'Georgia'}}>
            {'Date:' + this.state.date}
          </Text>
        </View>
        <Image source={photo} style={styles.image} />
        <View style={styles.diarycontainer}>
          <TextInput
            value={this.state.content}
            multiline={true}
            selectionColor="black"
            placeholder={"What's on your mind?"}
            editable={false}
            label="What's on your mind?"
            style={styles.diary}></TextInput>
        </View>
        <TouchableOpacity
          style={{alignItems: 'center', alignContent: 'center'}}
          onPress={() => this.props.navigation.pop()}>
          <View style={styles.button}>
            <Text>Back</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
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
    minHeight: 225,
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
