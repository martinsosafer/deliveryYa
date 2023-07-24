import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import HeaderTabs from '../Components/HeaderTabs';
import SearchBar from '../Components/SearchBar';
import Categories from '../Components/Categories';
import RestaurantItem from '../Components/RestaurantItem';
import BottomTabs from '../Components/BottomTabs';

const YELP_API_KEY = "H7R125uNBSl21s-D4TZvtRAxQ8Pojc5_kcpO5PL4DPWrPPX3hOpQMzXuyldjlQM1xFGe6E2HNlwzLFJ47MyT8LTFD34C-iuelF7Bjub7XUFkHopAGODsot2pG69iZHYx";

const HomeScreen = ({navigation}) => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [activeTab, setActiveTab] = useState("Delivery");
  const[city,setCity]=useState("San Francisco")
  const getRestaurantsFromYelp = async () => {
    
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      }
    };

    try {
      const response = await fetch(yelpUrl, apiOptions);
      const json = await response.json();
      setRestaurantData(json.businesses.filter((businesses) => businesses.transactions.includes(activeTab.toLowerCase())));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city,activeTab]);
// use effet nos ayuda a recargar la info cada vez que se requiera , por ej si buscamos una nueva ciudad cargara la info nuevamente gracias al use effect , si cambiamos al tab de pickup cargara la info de restaurantes con pickup o delivery correspondientemente que tab este activa
  return (
    <View style={styles.container}>
      <View style={styles.homeview}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        {restaurantData.length > 0 ? (
          <RestaurantItem restaurantData={restaurantData} navigation={navigation} />
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </ScrollView>
      <Divider width={1} />
      {restaurantData.length > 0 && <BottomTabs />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeview: {
    backgroundColor: "white",
    padding: 15,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
