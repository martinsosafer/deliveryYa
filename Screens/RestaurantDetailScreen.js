import { View, } from 'react-native'
import React from 'react'
import About from '../Components/RestaurantDetails/About'
import {Divider} from "react-native-elements"
import MenuItems from '../Components/RestaurantDetails/MenuItems'
import ViewCart from '../Components/RestaurantDetails/ViewCart'

const RestaurantDetailScreen = ({ route, navigation }) => {
  
  return (
    <View>
      <About route={route } />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems restaurantName={route.params.name } />
      
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      

      <ViewCart navigation={navigation} />
     
   
      
        
    </View>
  )
}

export default RestaurantDetailScreen