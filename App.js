import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet,AsyncStorage } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles';
import { store, persistor } from './src/redux/store';
import AppView from './src/modules/AppViewContainer';


export default function App() {
  // AsyncStorage.removeItem("userToken");
  AsyncStorage.setItem("BASE_URL","https://drivestarr.dsjkhanewal.com.pk/api/auth/");  
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <View style={styles.container}>
            <ActivityIndicator color={colors.red} />
          </View>
        }
        persistor={persistor}
      >
        <AppView />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
});
