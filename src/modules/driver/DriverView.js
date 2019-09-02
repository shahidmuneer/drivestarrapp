import React from 'react';
import { StyleSheet, View, Text, ScrollView, Picker,AsyncStorage ,
  AppRegistry,} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import { colors, fonts } from '../../styles';

import Spinner from 'react-native-loading-spinner-overlay';
import { Button, RadioGroup, Dropdown } from '../../components';
import axios from 'axios';

import { withNavigationFocus } from "react-navigation";
 class DriverScreen extends React.Component{
  constructor(props){
    super(props);
this.state={baseUrl:"",accessToken:"",data:[],loading:true,currentBus:""};
let vm=this;
let interval=setInterval(function() {
  const isFocused = props.navigation.isFocused();
  console.log("logged "+isFocused);
if (!isFocused) {
  clearInterval(interval);
}
    vm.updateBuses("","")
}, 2000);
}



  componentWillMount () {
    let vm=this;
    AsyncStorage.getItem("BASE_URL").then(function(item){
      vm.setState({baseUrl:item});
      AsyncStorage.getItem("userToken").then(function(token){
        vm.setState({accessToken:token});
        vm.updateBuses(item,token);
      })
    });
    

    
  }
  updateBuses=(base_url="",token="")=>{
if(base_url=="" && token==""){
  base_url=this.state.baseUrl;
  token=this.state.accessToken;
}

    let headers = {
      'Authorization': token
    };
    let vm = this;
    axios.post(base_url+'drivers/get-available-buses',{} ,
    { headers: headers }
    )
    .then(function (responseJson) {
      let current_bus="";
      if(responseJson.data.currentBus!=null){
        current_bus=responseJson.data.currentBus.route_name;
      }
      vm.setState({data:responseJson.data,loading:false,currentBus:current_bus});
    })
    .catch(error => {
      this.setState({loading:false});
        console.log("loggedError " + error);
      });
  }


  engageBus=(bus_id)=>{
    
    this.setState({loading:true});
    let base_url=this.state.baseUrl;
    let token=this.state.accessToken;
        let headers = {
          'Authorization': token
        };
        let vm = this;
        axios.post(base_url+'drivers/engage-bus',{
          bus_id:bus_id
        },
        { headers: headers }
        )
        .then(function (responseJson) {
          let current_bus="";
          if(responseJson.data.currentBus!=null){
            current_bus=responseJson.data.currentBus.route_name;
          }
          vm.setState({data:responseJson.data,loading:false,currentBus:current_bus});
        })
        .catch(error => {
          this.setState({loading:false});
            console.log("loggedError " + error);
          }); 
  }


  
disengageBus=()=>{
    let base_url=this.state.baseUrl;
    let token=this.state.accessToken;
    this.setState({loading:true});
        let headers = {
          'Authorization': token
        };
        let vm = this;
        axios.post(base_url+'drivers/disengage-bus',{},
        { headers: headers }
        )
        .then(function (responseJson) {
          vm.setState({data:responseJson.data,loading:false,currentBus:""});
        })
        .catch(error => {
          this.setState({loading:false});
            console.log("loggedError " + error);
          }); 
  }

  renderBuses=()=>{
    // console.log("logged "+JSON.stringify(this.state.data.data))
    if(this.state.data.data!=undefined){
      return this.state.data.data.map(bus=>{
         return <View key={bus.id} style={styles.componentsSection}>
            <Text style={styles.componentSectionHeader}>
              {bus.route_name}
            </Text>
            <View style={styles.demoButtonsContainer}>
              <Button
                style={styles.demoButton}
                primary
                caption="Engage Bus"
                onPress={() => {this.selectBus(bus.id)}}
              />
            </View>
          </View>; 
    })
  }
  }
  renderCurrentBus(){
if(this.state.currentBus!=""){
    return <Text style={styles.componentSectionHeader}> 
      Your Current Bus is {this.state.currentBus}
      </Text>;
}
else{
    return <Text style={styles.componentSectionHeader}> 
    Your Stack is empty
    </Text>;

}

  }

  selectBus(bus_id){
this.engageBus(bus_id);
  }
  render() {
    return <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
       <Spinner visible={this.state.loading} style={{color:"white"}}  
      textContent={''}></Spinner>

      <View style={styles.componentsTopSection}>
        {this.renderCurrentBus()}

        <View style={styles.demoButtonsContainer}>
              <Button
                style={styles.demoDisengageButton}
                color="#f58142"
                caption="Disengage Bus"
                onPress={() => {this.disengageBus()}}
              />
        </View>
     
      </View>
      {this.renderBuses()}
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
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
  componentsTopSection:{
    backgroundColor: "#e0f542",
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
  disengageContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  backgroundColor:"#e0f542"},
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
  demoDisengageButton:{
    marginTop: 8,
    marginBottom: 8,
    backgroundColor:"#f58142"
  },
  demoItem: {
    marginVertical: 15,
  },
});

AppRegistry.registerComponent('default', () => DriverScreen);

export default withNavigationFocus(DriverScreen);

