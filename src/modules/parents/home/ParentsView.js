import React from 'react';
import { StyleSheet, View, Text, ScrollView, Picker } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import { colors, fonts } from '../../../styles';

import { Button, RadioGroup, Dropdown } from '../../../components';

export default function ParentsScreen(props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>Your Current Bus is Bus1</Text>
      </View>


      <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>You bus2 is being used by driver John Smith, Kindly choose your bus</Text>
        {/* <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: lang })
          }> */}
          {/* <Picker.Item label="Bus1" value="Bus3" />
          <Picker.Item label="Bus3" value="Bus3" /> */}
        {/* </Picker> */}
        <View style={styles.demoButtonsContainer}>
          <Button
            style={styles.demoButton}
            primary
            caption="Apply"
            onPress={() => { }}
          />
        </View>


      </View>




      <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>You can change your bus by selecting the new bus</Text>
        {/* <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: lang })
          }> */}
          {/* <Picker.Item label="Bus2" value="Bus2" />
          <Picker.Item label="Bus3" value="Bus3" /> */}
        {/* </Picker> */}
        <View style={styles.demoButtonsContainer}>
          <Button
            style={styles.demoButton}
            primary
            caption="Apply"
            onPress={() => { }}
          />
        </View>
      </View>


    </ScrollView>
  );
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
