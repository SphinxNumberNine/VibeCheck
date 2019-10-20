import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContiner}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
        </View>
        <View style={styles.container1}>
          <Text style={styles.welcome}>WELCOME</Text>
          <View style={{height: 30}} />

          <View style={styles.emailContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={e => this.setState({username: e.toLowerCase()})}
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={password => this.setState({password})}
            />
          </View>

          <TouchableOpacity>
            <View style={styles.forgotPassword}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.logIn()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.normalContainer}>
          <Text style={styles.normalText}>Do not have account?</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.createAccount}>
            <Text style={styles.createText}>Create new account</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  async logIn() {
    console.log('LOG IN CALLED');
    console.log('username: ' + this.state.username);
    console.log('password: ' + this.state.password);
    var APIClient = global.APIClient;
    let loginResp = await APIClient.login(
      this.state.username,
      this.state.password,
    );
    if (loginResp.success) {
      console.log('LOG IN SUCCESS');
      this.props.navigation.navigate('navigator');
    } else {
      console.log('LOG IN FAILED');
      Alert.alert('Error', 'Could not login');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  container1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingTop: 50,
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  forgotPassword: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 30,
    alignItems: 'flex-end',
  },
  createAccount: {
    height: 30,
  },
  normalContainer: {
    height: 20,
  },
  normalText: {
    color: '#5B5A5A',
    fontSize: 12,
    alignItems: 'center',
    textAlign: 'center',
    width: 330,
  },
  createText: {
    color: '#FF7260',
    fontSize: 16,
    alignItems: 'center',
    textAlign: 'center',
    width: 330,
  },
  forgotText: {
    color: '#5B5A5A',
    fontSize: 12,
    alignItems: 'flex-end',
    textAlign: 'right',
    width: 330,
  },
  logoContiner: {
    marginTop: 100,
    height: 170,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  welcome: {
    fontSize: 25,
    color: '#5B5A5A',
    letterSpacing: 6,
  },
  textInput: {
    color: '#989899',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
  button: {
    width: 325,
    borderColor: '#129793',
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderRadius: 24,
    marginTop: 20,
    backgroundColor: '#129793',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#129793',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  emailContainer: {
    width: 325,
    borderColor: '#CFD0D1',
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: '#F5F6F7',
  },
  passwordContainer: {
    width: 325,
    borderColor: '#CFD0D1',
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#F5F6F7',
  },
});
