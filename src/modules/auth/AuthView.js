import React from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
export default class AuthLoading extends React.Component {
    constructor(props) {
      super(props);
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      const type = await AsyncStorage.getItem('userToken');
      if(type=="Driver"){
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      }else{
        this.props.navigation.navigate(userToken ? 'ParentsApp' : 'Auth');
      }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}
