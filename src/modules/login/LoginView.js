import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity,AsyncStorage } from 'react-native';
import { Card,  Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Lightbox from 'react-native-lightbox';
import {YellowBox} from 'react-native';
import { colors } from '../../styles';
import { GridRow } from '../../components';


export default class SignInScreen extends React.Component {static navigationOptions =
   {
  title: 'Please sign in',
};
constructor(props){
  super(props);
  this.state= {passwordInput:"",emailInput:""};
  this.handleEmailChange=this.handleEmailChange.bind(this);
  this.handlePasswordChange=this.handlePasswordChange.bind(this);
}

handleEmailChange(value){
this.state.emailInput=value;
}


handlePasswordChange(value){
  this.state.passwordInput=value;
  console.log(value);
  }


render() {
  return (
    <View>
      <Card title="Login Form"
      containerStyle={{padding: 5,marginTop:10}}>
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


<TouchableOpacity style={styles.buttonContainer} 
                     >

<Button
 
  containerStyle={{marginTop:10}}
  onPress={this._signInAsync}
  title="Login"
/>
                      

</TouchableOpacity> 
</Card>
    </View>
  );
}

_signInAsync = async () => {
  console.log(this.state);
  await fetch('https://dsjkhanewal.com.pk/api/login?username=MyUserName&password=MyPassword&login_email='+this.state.emailInput+"&login_password="+this.state.passwordInput, {
  method: 'GET'
  // body: JSON.stringify({
  //   login_email: this.state.emailInput,
  //   login_password: this.state.passwordInput,
  // }),
}) 
.then((response) => response.json())
.then(function(responseJson){
   AsyncStorage.setItem('userToken', 'abc');
  this.props.navigation.navigate('App');

})
.catch((error) => {
  console.error(error);
});


};
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
