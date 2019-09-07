import React from 'react';
import { Platform, StyleSheet, Text, View, Alert, ScrollView, AsyncStorage } from 'react-native';
import Lightbox from 'react-native-lightbox';

import { colors,fonts } from '../../../styles';
import { GridRow } from '../../../components';
import * as axios from "axios";
import DatePicker from 'react-native-datepicker'
// var PushNotification = require("react-native-push-notification");
import firebase from 'react-native-firebase';
export default class HomeScreen extends React.Component{
  constructor(props){
    super(props)
    this.state={accessCode:"",baseUrl:"",date:"",data:"",loading:false};
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
    this.updateList();
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
    
    let accessCode=await AsyncStorage.getItem("userToken");
    let baseUrl=await AsyncStorage.getItem("BASE_URL");

    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }

    let headers = {
      'Authorization': accessCode
    };
    // console.log("logged baseUrl="+baseUrl+" accessCode = "+accessCode)
    await axios.post(baseUrl+'register-notification', 
    {
      device_token: fcmToken
    }, { headers: headers }).then(function (responseJson) {
      // console.log("logged "+responseJson);
    }).catch(error => {
      console.log("Logged "+error)
    });
    
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



  
  async updateList() {
    let accessCode=await AsyncStorage.getItem("userToken");
    let baseUrl=await AsyncStorage.getItem("BASE_URL");
    let headers = {
      'Authorization': accessCode
    };
    console.log("logged baseUrl="+baseUrl+" accessCode = "+accessCode)
    let vm=this;
    this.setState({loading:true});
    await axios.post(baseUrl+'get-student-attendance', 
    {
      date: this.state.date
    }, { headers: headers }).then(function (responseJson) {
      vm.setState({data:responseJson.data.data,loading:false});
      console.log("logged updateList "+JSON.stringify(responseJson.data.data));
    }).catch(error => {
      console.log("Logged "+error)
    }); 
  }

  renderList(){
    if(this.state.data!=undefined && this.state.data!=""){
      let index=0;
   return this.state.data.map(attendance=>{
   return <View key={index++} style={styles.componentsSection2}>
        <Text style={styles.componentSectionHeader}>
          {attendance}
        </Text>
      </View>
      });
    }
  }
    render(){
      return <View>
         <Spinner visible={this.state.loading} style={{color:"white"}}  
      textContent={''}></Spinner>

       <View style={styles.componentsSection}>
       <DatePicker
         style={{width: "100%"}}
         date={this.state.date}
         mode="date"
         placeholder="select date"
         format="YYYY-MM-DD"
        //  minDate="2016-05-01"
        //  maxDate="2016-06-01"
         confirmBtnText="Confirm"
         cancelBtnText="Cancel"
         customStyles={{
           dateIcon: {
             position: 'absolute',
             left: 0,
             top: 4,
             marginLeft: 0
           },
           dateInput: {
             marginLeft: 36
           }
           // ... You can check the source to find the other keys.
         }}
         onDateChange={(date) => {
           this.setState({date: date})
           this.updateList()
          }}
       />
       </View>
        <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}>
      {this.renderList()}
        </ScrollView>
    </View>
    }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    paddingBottom: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  componentsSection2: {
    backgroundColor: colors.yellow,
    padding: 15,
    paddingBottom: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  componentSectionHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 20,
    marginBottom: 20,
  },
  demoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  demoIconsContainer: {
    
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  demoItem: {
    marginVertical: 15,
  },
});
