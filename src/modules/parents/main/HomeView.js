import React from 'react';
import { Platform, StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import Lightbox from 'react-native-lightbox';

import { colors } from '../../../styles';
import { GridRow } from '../../../components';
import * as axios from "axios";

// var PushNotification = require("react-native-push-notification");
import firebase from 'react-native-firebase';
export default class HomeScreen extends React.Component{
  constructor(props){
    super(props)
    this.state={"accessCode":"","baseUrl":""};
    AsyncStorage.getItem("userToken").then(item => this.state.accessCode = item);
    AsyncStorage.getItem("BASE_URL").then(item=>this.state.baseUrl=item);
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        
        axios.post(this.state.baseUrl+'register-notification', {
          myContent: e.data,
          bus_id: this.state.bus_id
        }, { headers: headers }).then(function (responseJson) {
          console.log("logged content " + JSON.stringify(responseJson));
        }).catch(error => {
          console.log("loggedError " + error);
        });

        // console.log('fcmToken:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log('onNotification:');
      
        const localNotification = new firebase.notifications.Notification({
          sound: 'sampleaudio',
          show_in_foreground: true,
        })
        .setSound('sampleaudio.wav')
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
        .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
    });

    const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
      .setDescription('Demo app description')
      .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log('onNotificationOpened:');
      Alert.alert(title, body)
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:');
      Alert.alert(title, body)
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log("JSON.stringify:", JSON.stringify(message));
    });
  }



  

    render(){
      return <View>
       <Text> Welcome Parents</Text>
      </View>
    }
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  topImage: {
    flex: 1,
    height: 200,
    margin: 5,
    borderRadius: 5,
  },
  imagesRow: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    padding: 5,
  },
  image: {
    flex: 1,
    height: 100,
    borderRadius: 5,
  },
});
