import React,{useRef} from 'react';
import {AsyncStorage,Button} from "react-native";
import Tts from 'react-native-tts';
import * as axios from "axios";
import { withNavigationFocus } from "react-navigation";
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
class HomeScreen  extends React.Component{
  constructor(props) {
    super(props);
    this.state = { accessCode: "",scanner:null, bus_id: "" };
    AsyncStorage.getItem("userToken").then(item => this.state.accessCode = item);
    AsyncStorage.getItem("bus").then(item => this.state.bus_id = item);
  }


    
    renderCamera(){
      const isFocused = this.props.navigation.isFocused();
      if (!isFocused) {
        return <View></View>;
      }
      else if (isFocused) {
        return <QRCodeScanner onRead={this.onSuccess} 
          ref={(node) =>  this.state.scanner= node }
         topContent={<Text style={{ backgroundColor: "white" }}>
        </Text>} bottomContent={<TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>} />
      }
    };
    onSuccess = (e) => {
      let headers = {
        'Authorization': this.state.accessCode,
      };
      let vm = this;
      //  console.log("logged "+e.data);
      //  console.log("logged "+this.state.accessCode);
      Tts.speak('Scan Successfull ');
      Toast.show("Scan Successful !");
      axios.post('https://www.drivestarr.dsjkhanewal.com.pk/api/auth/student/scan', {
        myContent: e.data,
        attendance_type: "checkout",
        bus_id: this.state.bus_id
      }, { headers: headers }).then(function (responseJson) {
        console.log("logged content " + JSON.stringify(responseJson));
      }).catch(error => {
        console.log("loggedError " + error);
      });
      setTimeout(function () {
        vm.scanner.reactivate();
      }, 1000);
    };
    render (){
    
    return <View style={styles.container}>
      {this.renderCamera()}
    </View>
    }
  
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


AppRegistry.registerComponent('default', () => HomeScreen);

export default withNavigationFocus(HomeScreen);