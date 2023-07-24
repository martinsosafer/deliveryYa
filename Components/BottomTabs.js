import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const BottomTabs = () => {
  return (
    <View style={styles.bottomtabcontainer}>
      <Icon icon="home" text="inicio"/>
      <Icon icon="search" text="Buscar" />
      <Icon icon="shopping-bag" text="Compras" />
      <Icon icon="receipt" text="ordenes" />
      <Icon icon="user" text="cuenta"/>
    </View>
  );
};
const Icon = (props) => (
  <View>

    <FontAwesome5 name={props.icon} size={25} style={styles.bottomicon} />
    <Text  style={styles.bottomtabtext}>{props.text}</Text>
  </View>
)

const styles = StyleSheet.create({
  bottomtabcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  // tab: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: 'black',
  // },
  bottomicon: {
    marginBottom: 3,
    alignSelf: "center"
    
  },
  bottomtabtext: {
    fontWeight:'bold'
  }
});

export default BottomTabs;
