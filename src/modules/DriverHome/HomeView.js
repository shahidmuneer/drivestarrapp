import React,{useRef} from 'react';
import {AsyncStorage,Button} from "react-native";
import Tts from 'react-native-tts';
import * as axios from "axios";

import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  StyleSheet,
  AppRegistry,
  View,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Toast from 'react-native-simple-toast';
export default function HomeScreen({ isExtended, setIsExtended }) {
  this.scanner=null;
  this.state={accessCode:"",bus_id:""}
AsyncStorage.getItem("userToken").then(item => this.state.accessCode=item);
AsyncStorage.getItem("bus").then(item => this.state.bus_id=item);

    // getitem().then(response => {
    //   // do stuff using response ..
    //   console.log("logged "+response);
    // });
  
  // _getStorageValue=async()=>{
  //   var value = await AsyncStorage.getItem('userToken')
  //   return value
  // }
  // console.log("logged "+ _getStorageValue().then)
  // _getStorageValue.then((response)=>console.log("logged "+response));
  async function getitem() {
    try {
      const retrievedItem = await AsyncStorage.getItem("userToken");
      const item = JSON.parse(retrievedItem);
      return Promise.resolve(item);
    } catch (error) {
      return Promise.reject(error)
    }
    // return; <-- don't need this!
  }
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };
  onSuccess = (e) => {
    let headers = {
      'Authorization': this.state.accessCode,
      // "Content-Type":"application/x-www-form-urlencoded"
    } 
 let vm=this;
//  console.log("logged "+e.data);
//  console.log("logged "+this.state.accessCode);
 Tts.speak('Scan Successfull ');
 Toast.show("Scan Successful !");
  axios.post('https://www.drivestarr.dsjkhanewal.com.pk/api/auth/student/scan',{
    myContent: e.data,
    attendance_type:"checkout",
    bus_id:this.state.bus_id
          },{headers: headers}).then(function(responseJson){
    console.log("logged content "+JSON.stringify(responseJson));
            }).catch(error => {
              console.log("loggedError "+error);
          });
 setTimeout(function(){
          vm.scanner.reactivate();
      }, 1000);
  }

  // sendRequest=()=>{ 
  //     let headers = {
  //       'Authorization': this.state.accessCode,
  //       // "Content-Type":"application/x-www-form-urlencoded"
  //     } 
  //   axios.post('https://www.drivestarr.dsjkhanewal.com.pk/api/auth/student/scan',{
  //   myContent: `{"type":"Bearer","data":"eyJpdiI6InF4Z1EzVWxSUmt3b3F6cWVvSGlNa1E9PSIsInZhbHVlIjoiTkJaUEk4ODJjeWFPMTN6UTFCMkREZz09IiwibWFjIjoiNDc4ZGZhYmEyOTkwYzFkMjdmZmY1MjE3YzAzNjFjYjA2NTE2OWVjOThmNDBlZGM4YjM1NDQ4NTM1MmYyNDU4ZCJ9"}`,
  //   attendance_type:"checkout"
  //         },{headers: headers}).then(function(responseJson){
  //   console.log("logged content "+JSON.stringify(responseJson));
  //           }).catch(error => {
  //             console.log("loggedError "+error);
  //         });;
  //   // console.log("logged "+this.state.accessCode);
  // }
//  const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': AsyncStorage.getItem("userToken")
// } 
// let vm=this;
//  axios.post('https://www.drivestarr.dsjkhanewal.com.pk/api/auth/student/scan',{
//   data: "",
//   attendance_type:"checkout"
//         },headers).then(function(responseJson){
//   console.log(responseJson);
//           });
//         vm.scanner.reactivate();
//   }
 
  return (
    <View style={styles.container}>
    
 {/* <Button
 containerStyle={{marginTop:10}}
 onPress={this.sendRequest}
 title="Request"
/>   */}

     <QRCodeScanner
        onRead={this.onSuccess}
        ref={(node) => { this.scanner = node }}
        topContent={
          <Text style={{backgroundColor:"white"}}>
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        }
      />
        {/* <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
          <Text size={20} white>
            Home
          </Text>
        </View>
        <View style={styles.section}>
          <Text color="#19e7f7" size={15}>
            The smartest Way to build your mobile app
          </Text>
          <Text size={30} bold white style={styles.title}>
            React Native Starter
          </Text>
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text color="#19e7f7" hCenter size={15} style={styles.description}>
            {' '}
            A powerful starter project that bootstraps development of your
            mobile application and saves you $20 000*
          </Text>
          <View style={styles.priceContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text white bold size={50} style={styles.price}>
                {isExtended ? '$199.95' : '$49.95'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.priceLink}
              onPress={() =>
                isExtended ? setIsExtended(false) : setIsExtended(true)
              }
            >
              <Text white size={14}>
                {isExtended
                  ? 'Multiple Applications License'
                  : 'Single Application License'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground> */}

      
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});


AppRegistry.registerComponent('default', () => ScanScreen);