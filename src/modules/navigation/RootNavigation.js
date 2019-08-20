import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer,createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

// import GalleryScreen from '../gallery/GalleryViewContainer';
import DriverScreen from '../driver/DriverViewContainer';
import AuthScreen from "../auth/AuthViewContainer";
import LoginScreen from '../login/LoginViewContainer';

// To use this screens please see the full version at https://reactnativestarter.com
// import ProfileScreen from '../containers/ProfileScreen';
// import ArticleScreen from '../containers/ArticleScreen';
// import ChatScreen from '../containers/chat/ChatScreen';
// import MessagesScreen from '../containers/chat/MessagesScreen';
// import ChartsScreen from '../containers/ChartsScreen';

import AvailableInFullVersion from '../availableInFullVersion/AvailableInFullVersionViewContainer';

import { colors, fonts } from '../../styles';

const headerBackground = require('../../../assets/images/topBarBg.png');

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: () => ({
        title: 'Drivestarr',
        headerLeft: null,
      }),
    },
    Driver: {
      screen: DriverScreen,
      navigationOptions: {
        header: null,
      },
    },
    // Gallery: {
    //   screen: GalleryScreen,
    //   navigationOptions: {
    //     title: 'Gallery',
    //   },
    // },
    // Article: {
    //   screen: AvailableInFullVersion,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
    // Chat: {
    //   screen: AvailableInFullVersion,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
    // Messages: {
    //   screen: AvailableInFullVersion,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
    // Charts: {
    //   screen: AvailableInFullVersion,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
      // headerBackground: (
      //   <Image
      //     style={{ flex: 1 }}
      //     source={headerBackground}
      //     resizeMode="cover"
      //   />
      // ),
      headerTitleStyle: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#222222',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Image
            source={require('../../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
);
const AuthStack = createStackNavigator({ SignIn: LoginScreen },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default createAppContainer(
  createSwitchNavigator(
    {
  App: stackNavigator,
  Auth:AuthStack,
  AuthLoading: AuthScreen
      },
      {
    initialRouteName: 'AuthLoading',
      }
      
      ));
