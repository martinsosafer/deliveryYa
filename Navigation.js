
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import HomeScreen from './Screens/HomeScreen';
import RestaurantDetailScreen from './Screens/RestaurantDetailScreen';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './redux/store';
import OrderComplete from './Screens/OrderComplete';

const store = configureStore();

export default function RootNavigation() {
  
  
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  
  
  return (
    <ReduxProvider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
          <Stack.Screen name="OrderComplete" component={OrderComplete}/>
          
      </Stack.Navigator>
    </NavigationContainer>
    </ReduxProvider>
  )
}