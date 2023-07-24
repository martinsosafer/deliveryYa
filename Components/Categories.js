import { View, Text,Image,StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const items = [
  {
    image: require("../Assets/images/shopping-bag.png"),
    text:"Pick Up"
  },
  {
    image: require("../Assets/images/soft-drink.png"),
    text:"Bebidas"
  },
  {
    image: require("../Assets/images/bread.png"),
    text:"Panaderia"
  },
  {
    image: require("../Assets/images/fast-food.png"),
    text:"Comida Rapida"
  },
  {
    image: require("../Assets/images/deals.png"),
    text:"Ofertas"
  },
  {
    image: require("../Assets/images/coffee.png"),
    text:"Cafeteria"
  },
  {
    image: require("../Assets/images/desserts.png"),
    text:"Postres"
  }
]
const Categories = () => {
  return (
    <View style={styles.catview}>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {/* MAPEO DE ITEMS EMPIEZA AQUI */}
      {items.map((item,index)=>(
        <View key={index} style={styles.catcontainerview}>
      <Image source={item.image} style={styles.catimg} />
      <Text style={styles.cattext}>{item.text }</Text>
      </View>
     
     ))}
       {/* MAPEO DE ITEMS TERMINA AQUI */ }
    </ScrollView>
</View>
  )
}
const styles = StyleSheet.create({
  catview: {
    marginTop: 5,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingLeft:20,
  },
  catcontainerview: {
    alignItems: "center",
    marginRight:35
  }
  ,

  catimg: {
    width: 50,
    height: 40,
    resizeMode:"contain"

  },
  cattext: {
    fontSize: 13,
    fontWeight:"900"
  }
})
export default Categories