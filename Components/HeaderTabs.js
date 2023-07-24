import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useState } from 'react'

const HeaderTabs = (props) => {
  
  return (
    <View style={styles.headercomponents}>
      <HeaderButton text="Delivery" btncolor="black" textcolor="white" activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
      <HeaderButton text="PickUp" btncolor="white" textcolor="black" activeTab={props.activeTab} setActiveTab={props.setActiveTab}/>
    </View>
  )
}

const HeaderButton = (props) => (
 
    <TouchableOpacity style={[styles.headerbutton, { backgroundColor: props.activeTab===props.text?"black":"white" }]}onPress={()=>props.setActiveTab(props.text)}>
      <Text style={[styles.headertext, { color:props.activeTab===props.text?"white":"black" }]}>{props.text}</Text>
    </TouchableOpacity>
)
const styles = StyleSheet.create({
  headercomponents: {
    alignSelf: "center",
    flexDirection: "row",
    paddingTop:25
  },
  headerbutton: {
    
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius:30
  },
  headertext: {
    
    fontSize: 15,
    fontWeight:900
  }
})

export default HeaderTabs

// NOTAS
{/* El texto por si solo no tiene una propiedad on touch , asi que touchableOpacity nos permite darle propiedades */ }
//  Se utilizo el hook useState para manejar los colores del background y de texto de los tabs 