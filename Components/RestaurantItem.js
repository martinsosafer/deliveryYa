
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RestaurantItem = ({ navigation, ...props }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories,
            })
          }
        >
          {/* todo lo que esta entre { } luego de "RestaurantDetail" es lo que pasamos como route */}
          <View
            key={index}
            style={[
              styles.restoview,
              index === props.restaurantData.length - 1 && styles.lastItemPadding,
            ]}
          >
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};



const RestaurantImage = (props) => (
  <>
    <Image source={{ uri: props.image }} style={styles.restaurantimg} />
    <TouchableOpacity style={styles.heartIcon}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = (props) => (
  <View style={styles.restoinfo}>
    <View>
      <Text style={styles.restoname}>{props.name}</Text>
      <Text style={styles.restotime}>30-45 min</Text>
    </View>
    <View style={styles.restoratingview}>
      <Text style={styles.restorating}>{props.rating}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  restoview: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  lastItemPadding: {
    paddingBottom: 10, // Adjust this value as needed
  },
  restaurantimg: {
    width: "100%",
    height: 180,
  },
  heartIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  restoinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  restoname: {
    fontSize: 15,
    fontWeight: "bold",
  },
  restotime: {
    fontSize: 13,
    color: "grey",
  },
  restoratingview: {
    backgroundColor: "#eee",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});

export default RestaurantItem;
