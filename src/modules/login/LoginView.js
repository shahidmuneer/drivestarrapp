import React from 'react';
import * as axios from "axios";
import { StyleSheet, View,Text,Alert,TouchableOpacity,AsyncStorage } from 'react-native';
import { Card,  Input,Image,Button } from 'react-native-elements'
import { colors } from '../../styles';
import Spinner from 'react-native-loading-spinner-overlay';
export default class SignInScreen extends React.Component {static navigationOptions =
  {
  title: 'Please sign in',
  };
constructor(props){
  super(props);
  this.state= {passwordInput:"",emailInput:"",loading:false,error:""};
  this.handleEmailChange=this.handleEmailChange.bind(this);
  this.handlePasswordChange=this.handlePasswordChange.bind(this);
}

handleEmailChange(value){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
  {
    this.setState({
      error:""
    });
  }
  else if(value==""){
    this.setState({
      error:""
    });
  }
  else{
    this.setState({
      error:" Invalid Email Address"
    });
  }
this.state.emailInput=value;
}


handlePasswordChange(value){
  this.state.passwordInput=value;
  }


render() {
  return (
    <View style={styles.container}>
      <Spinner visible={this.state.loading} style={{color:"white"}}  
      textContent={''}></Spinner>

            <View style={{ width:"100%",marginTop:-120,justifyContent: 'center',
    alignItems: 'center'}}>
                <Image
  source={require('../../../assets/images/icon2.png')}
  style={{ width: 150, height: 150,resizeMode:'contain' }}
  />
  </View>
  {/* title="Login Form" */}
      <Card
      containerStyle={{padding: 5,marginTop:10,width:"90%"}}>
     
        <Text style={{color:'red',paddingLeft:20}}>{this.state.error}</Text>
        <Input
         containerStyle={{marginTop:10}}
  leftIcon={{ type: 'font-awesome', name: 'user' }}
  style = {styles.input} 
  autoCapitalize="none" 
  onSubmitEditing={() => this.state.passwordInput.focus()} 
  autoCorrect={false} 
  onChangeText={(text) => this.handleEmailChange(text)}
  keyboardType='email-address' 
  returnKeyType="next" 
  placeholder='Email Address'
/>

<Input
              leftIcon={{ type: 'font-awesome', name: 'key' }}
              style = {styles.input}  
              containerStyle={{marginTop:10}}
              returnKeyType="go" 
              onChangeText={(text) => this.handlePasswordChange(text)}
              ref={(input)=> this.state.passwordInput = input} 
              placeholder='Password'
              secureTextEntry
/>


<Button
 
  containerStyle={{marginTop:10}}
  onPress={this._signInAsync}
  title="Login"
/>

                     
</Card>
    </View>
  );
}

_signInAsync = async () => {
  if(this.state.error!=""){
    return;
  }
//  let body =
this.setState({
  loading:true
});
let vm=this;
//   await fetch('https://www.drivestarr.dsjkhanewal.com.pk/api/auth/login', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body:JSON.stringify({
//     email: this.state.emailInput,
//     password: this.state.passwordInput,
//   })
// }) 
// .then((response) => response.json())
// .then(function(responseJson){

await axios.post('https://www.drivestarr.dsjkhanewal.com.pk/api/auth/login',{
        email: this.state.emailInput,
        password: this.state.passwordInput
}).then(function(responseJson){
  vm.setState({
      loading:false
    });
 if(responseJson.status==200){
  AsyncStorage.setItem('userToken',responseJson.data.token_type+" "+responseJson.data.access_token);
  AsyncStorage.setItem('userType',responseJson.data.role);
  if(responseJson.data.role=="Driver")
  {
    AsyncStorage.setItem('bus',responseJson.data.bus.toString());
   vm.props.navigation.navigate("App");
  }else if(responseJson.data.role=="Parents"){
    vm.props.navigation.navigate("ParentsApp");
  }
}
 else{
  vm.setState({
    loading:false
  });
  Alert.alert("Oops !","Email / Password is wrong");
 }
})
.catch((error) => {
  console.error("error"+error);
});


};
 async storeItem(key, item){
  try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key,item);
      return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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