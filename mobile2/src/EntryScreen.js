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
  ScrollView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Modal, {ModalContent} from 'react-native-modals';

const photos = require('./ImageImporter');

function Comment({user, content, date}) {
  return (
    <View
      key={content + date}
      style={{
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '42%',
        borderRadius: 15,
      }}>
      <Text
        style={{
          fontSize: 16,
          color: '#000000',
          fontWeight: 'bold',
        }}>
        {user + ' commented'}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#000000',
        }}>
        {content}
      </Text>
    </View>
  );
}

var forumId = '';
var entryId = '';

export default class EntryScreen extends Component {
  constructor(props) {
    super(props);
    var data = props.navigation.state.params.data;
    entryId = props.navigation.state.params.entryId;
    forumId = props.navigation.state.params.forum;
    this.state = {
      username: data.username,
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
        <ScrollView>
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
              {'Date:' + this.state.date + ' | ' + this.state.username}
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
          <Text style={{textAlign: 'center'}}>
            _______________________________________________________________
          </Text>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TextInput
              style={{fontSize: 17}}
              placeholder="Enter a comment here"
              onChangeText={text => this.setState({userComment: text})}
            />
          </View>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              console.log(
                'TESTING:: ' +
                  forumId +
                  ' ' +
                  entryId +
                  ' ' +
                  this.state.userComment,
              );
              global.APIClient.addComment(
                forumId,
                entryId,
                this.state.userComment,
              );
            }}>
            <View style={styles.button}>
              <Text>Add Comment</Text>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 15, marginBottom: 15, textAlign: 'center'}}>
            _______________________________________________________________
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: 'Georgia',
            }}>
            Comments
          </Text>
          <FlatList
            data={this.state.comments}
            renderItem={({item}) => (
              <Comment
                user={item.username}
                date={item.createdAt}
                content={item.content}
              />
            )}
          />
        </ScrollView>
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
