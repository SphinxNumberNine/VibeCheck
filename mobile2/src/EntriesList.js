import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

dataArray = [];

function Item(props) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('entry', {
          data: props.props,
          entryId: props.props._id,
          forum: props.navigation.state.params.forumTitle.toLowerCase(),
        })
      }>
      <View
        key={props.props}
        style={{
          height: 125,
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          minWidth: '90%',
          borderRadius: 5,
          borderWidth: 1,
        }}>
        <View
          style={{
            borderRadius: 75,
            width: 30,
            height: 30,
            borderWidth: 1,
            backgroundColor: props.props.color,
          }}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Georgia',
            }}>
            {props.props.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'grey',
              fontWeight: 'bold',
              fontFamily: 'Georgia',
            }}>
            {props.props.username}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'grey',
              fontWeight: 'bold',
              fontFamily: 'Georgia',
            }}>
            {props.props.date}
          </Text>
        </View>
        <View>
          <Text style={{fontFamily: 'Georgia', textAlign: 'right'}}>
            {props.props.comments.length +
              ' comment' +
              (props.props.comments.length > 1 ? 's' : '')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class EntriesList extends Component {
  constructor(props) {
    super(props);
    dataArray = [];
    this.props.navigation.addListener('willFocus', async result => {
      let res = await global.APIClient.getForumEntries(
        props.navigation.state.params.forumTitle.toLowerCase(),
      );

      dataArray = res.body.entries;
      console.log('ForumEntries: ' + JSON.stringify(dataArray, null, 4));
    });

    let currentComponent = this;

    setInterval(() => {
      currentComponent.setState({testing: 'yuh'});
    }, 500);
  }
  render() {
    const forumTitle = this.props.navigation.state.params.forumTitle;
    return (
      <SafeAreaView
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Georgia',
            marginTop: '5%',
            fontWeight: 'bold',
          }}>
          {forumTitle + ' Forum'}
        </Text>
        <FlatList
          style={{minHeight: 700}}
          data={dataArray}
          renderItem={({item}) => (
            <Item props={item} navigation={this.props.navigation} />
          )}
          keyExtractor={item => item.title}
        />
      </SafeAreaView>
    );
  }

  renderViewItem({title}) {
    return <Text>{title}</Text>;
  }
}
