/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';

import HomeScreen from '../DriverHome/HomeViewContainer';
// import CalendarScreen from '../calendar/CalendarViewContainer';
// import GridsScreen from '../grids/GridsViewContainer';
// import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';

import DriverScreen from '../driver/DriverViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconProfile = require('../../../assets/images/pages/profile.png');
// const iconGrids = require('../../../assets/images/tabbar/grids.png');
// const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const hederBackground = require('../../../assets/images/topBarBg.png');

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
    tintColor: colors.white,
  },
  tabBarIconFocused: {
    tintColor: colors.black,
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    backgroundColor:colors.yellow
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  headerCaption: {
    fontFamily: fonts.primaryRegular,
    color: colors.white,
    fontSize: 18,
  },
});

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Driver: {
      screen: DriverScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Driver</Text>
          </View>
        ),
      },
    },
    // Grids: {
    //   screen: GridsScreen,
    //   navigationOptions: {
    //     header: (
    //       <View style={styles.headerContainer}>
    //         <Image style={styles.headerImage} source={hederBackground} />
    //         <Text style={styles.headerCaption}>Grids</Text>
    //       </View>
    //     ),
    //   },
    // },
    // Pages: {
    //   screen: PagesScreen,
    //   navigationOptions: {
    //     header: (
    //       <View style={styles.headerContainer}>
    //         <Image style={styles.headerImage} source={hederBackground} />
    //         <Text style={styles.headerCaption}>Pages</Text>
    //       </View>
    //     ),
    //   },
    // },
    Menu: {
      screen: ComponentsScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Menu</Text>
          </View>
        ),
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case 'Home':
            iconSource = iconHome;
            break;
          case 'Driver':
            iconSource = iconProfile;
            break;
          // case 'Grids':
          //   iconSource = iconGrids;
          //   break;
          // case 'Pages':
          //   iconSource = iconPages;
          //   break;
          case 'Menu':
            iconSource = iconComponents;
            break;
          default:
            iconSource = iconComponents;
        }
        return (
          <View style={styles.tabBarItemContainer}>
            <Image
              resizeMode="contain"
              source={iconSource}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
            />
          </View>
        );
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: colors.yellow,
        borderTopWidth: 0.5,
        borderTopColor: '#d6d6d6',
      },
      labelStyle: {
        color: colors.white,
      },
    },
  },
);
