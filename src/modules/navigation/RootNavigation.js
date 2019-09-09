import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer,createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';



import ParentsTabNavigator from './ParentsTabNavigator';

// import GalleryScreen from '../gallery/GalleryViewContainer';
import DriverScreen from '../driver/DriverViewContainer';
import ParentsScreen from '../parents/home/ParentsViewContainer';
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
import ComponentsScreen from '../components/ComponentsView';

const headerBackground = require('../../../assets/images/topBarBg.png');

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: () => ({
        title: 'Home',
        headerLeft:null
      }),
    },
    Driver: {
      screen: DriverScreen,
      navigationOptions: {
        title:"Choose Driver",
        headerLeft:null
      },
    },
    component: {
      screen: ComponentsScreen,
      navigationOptions: {
        title: 'Menu',
        headerLeft:null
      },
    },
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
        backgroundColor: colors.yellow,
        borderBottomWidth: 0,
      },
      component: {
        screen: ComponentsScreen,
        navigationOptions: {
          title: 'Menu',
        },
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




const parentsNavigator = createStackNavigator(
  {
    Main: {
      screen: ParentsTabNavigator,
      navigationOptions: () => ({
        title: 'Home',
        headerLeft:null
      }),
    },
    Parents: {
      screen: ParentsScreen,
      navigationOptions: {
        title:"Home",
        headerLeft:null
      },
    },
    component: {
      screen: ComponentsScreen,
      navigationOptions: {
        title:"Menu",
        headerLeft:null
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
    //   }
    // },
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.yellow,
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
)
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
  ParentsApp:parentsNavigator,
  Auth:AuthStack,
  AuthLoading: AuthScreen
      },
      {
    initialRouteName: 'AuthLoading',
      }
      
      ));
