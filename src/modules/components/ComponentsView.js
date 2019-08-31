// import React from 'react';
// import { List, ListItem ,FlatList} from 'react-native-elements'
// import {
//   AppRegistry
// } from 'react-native';
// const list = [
//   {
//     name: 'Amy Farha',
//     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//     subtitle: 'Vice President'
//   },
//   {
//     name: 'Chris Jackson',
//     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//     subtitle: 'Vice Chairman'
//   },
// ];


// export default function ComponentsScreen({ isExtended, setIsExtended }) {
//   renderRow = ({item}) => {
//     return (
//       <ListItem
//         roundAvatar
//         title={item.name}
//         subtitle={item.subtitle}
//         avatar={{uri:item.avatar_url}}
//       />
//     )
//   }

//   return (
//     <List>
//       <FlatList
//         data={list}
//         renderItem={this.renderRow}
//         keyExtractor={item => item.name}
//       />
//     </List>
//   )
// }



// AppRegistry.registerComponent('default', () => ComponentsScreen);

import React from 'react';
import { StyleSheet, View,TouchableHighlight,  FlatList, Text ,AsyncStorage} from 'react-native';
import { List, ListItem } from 'react-native-elements'

import {
  AppRegistry
} from 'react-native';

export default function ComponentsScreen(props)  {
  renderList=({item})=>{
     return <TouchableHighlight 
     onPress={() => this.callFunction(item.function)}>
     <ListItem style={styles.item} title={item.key} />
     </TouchableHighlight>
  }
  logout=()=>{
  AsyncStorage.removeItem("userToken");  
  props.navigation.navigate("Auth");
  }

  callFunction=(func)=>{
    switch(func){
      case "logout":{
        logout();
        break;
      }
      default:{
        break;
      }

    }
  }


  return (
   <View>
<FlatList
          data={[
            {key: 'Logout',function:"logout"}
          ]}
          renderItem={this.renderList}
        />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
})


AppRegistry.registerComponent('default', () => ComponentsScreen);
