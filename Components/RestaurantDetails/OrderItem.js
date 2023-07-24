import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { color } from 'react-native-elements/dist/helpers'

const OrderItem = ({ item }) => {
  const { title, price}= item
  return (
    <View style={styles.orderview}>
      <Text style={styles.ordertext}>{title}</Text>
      <Text style={styles.orderprice}>{price}</Text>
    </View>
  )
}
styles = StyleSheet.create({
  orderview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor:"#999"
  },
  ordertext: {
    fontWeight: 600,
    fontSize: 16
  },
   orderprice: {
     fontWeight: 600,
     fontSize: 16,
     opacity: 0.5,
    
  }
})
export default OrderItem