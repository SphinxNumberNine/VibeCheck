import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

import photo from '../assets/images/colorful.jpg';

var target;

const forums = [
  {title: 'Growth', color: '#5499C7'},
  {title: 'Goals', color: '#5DADE2'},
  {title: 'Joy', color: '#48C9B0'},
  {title: 'Sadness', color: '#45B39D'},
  {title: 'Vices', color: '#52BE80'},
  {title: 'Heartbreak', color: '#58D68D'},
  {title: 'Loneliness', color: '#F4D03F'},
  {title: 'Fears', color: '#f5b041'},
  {title: 'Personal', color: '#eb984e'},
  {title: 'Misc', color: '#dc7633'},
];

function Item({title, color, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => addToForum(title.toLowerCase(), navigation)}>
      <View
        key={title}
        style={{
          backgroundColor: color,
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
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

async function addToForum(forum, navigation) {
  console.log('TARGET1::' + JSON.stringify(target));
  console.log('FORUM::' + forum);
  await global.APIClient.addEntryToForum(forum, target);

  navigation.navigate('calendar');
}

export default class ListForums extends Component {
  constructor(props) {
    super(props);
    target = this.props.navigation.state.params.id;
    console.log('TARGET2::' + JSON.stringify(target));
  }
  render() {
    return (
      <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginTop: '6%',
            marginBottom: '3%',
          }}>
          Please select a forum to post to:
        </Text>
        <FlatList
          numColumns={2}
          data={forums}
          renderItem={({item}) => (
            <Item
              title={item.title}
              color={item.color}
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={item => item.id}
        />
        <Image source={photo} style={styles.image} />
      </SafeAreaView>
    );
  }

  renderItems() {
    forums.map(title => {
      return new Item({title});
    });
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '40%',
    borderRadius: 15,
  },
  image: {
    maxHeight: '30%',
    width: '100%',
  },
});
