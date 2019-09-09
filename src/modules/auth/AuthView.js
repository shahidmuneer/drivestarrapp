import React from 'react';

import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {Image} from "react-native-elements";
import { colors } from '../../styles';
import * as Animatable from 'react-native-animatable';
// const StyledImage = Animatable.createAnimatableComponent(styled.Image);
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
        <View style={{backgroundColor:colors.yellow ,flex: 1,
          justifyContent: 'center',
          alignItems: 'center'}}>

          <Animatable.Image
  source={require('../../../assets/images/loader.png')}
  style={{ width: 100, height: 100,resizeMode:'contain' }}
  animation="rotate" iterationCount="infinite"
  />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}
