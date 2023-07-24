import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Image,ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import firebase from 'firebase/compat';
import * as Animatable from 'react-native-animatable';
import { Divider } from "react-native-elements"
const OrderComplete = () => {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Bologna",
        description: "que ricoo",
        price: "$13.40",
        image: "https://www.pequerecetas.com/wp-content/uploads/2021/03/comidas-rapidas.jpg"
      }
    ]
  });

  const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems);

  const total = items.map((item) => Number(item.price.replace("$", ""))).reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD"
  });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });
    return unsubscribe;
  }, []);

  return (
    <View>
      <View style={styles.orderview}>
        <LottieView
          style={styles.orderanimation}
          source={require("../Assets/Animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        
        <Text style={styles.ordertext}>Tu orden en <Text style={{ color: "#FF4500" }}>{restaurantName}</Text> se ha registrado por un total de <Text style={{ color: "green" }}>{totalUSD}</Text></Text>
        <Divider width={1} style={{marginHorizontal:20}} />
        <View style={styles.viewcartitemscontainer}>

        <ViewCartItems items={lastOrder.items} />
        </View>
        <LottieView
          style={styles.orderanimation}
          source={require("../Assets/Animations/cooking.json")}
          autoPlay
          speed={0.5}
        />
        <Divider width={1} style={{marginHorizontal:20}} />
        <Text style={styles.ordertext}>🚩Tu orden esta siendo preparada y unos de nuestros riders va camino a buscarla🚩</Text>
        <LottieView
          style={styles.orderanimation}
          source={require("../Assets/Animations/motocicleta.json")}
          autoPlay
          speed={0.5}
        />
      </View>
    </View>
  );
};

const ViewCartItems = ({ items }) => {
  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.orderfoodcontainer}>

    <View style={styles.orderfoodcontainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.orderitemcontainer}>
            <Text style={styles.ordertitle}>{item.title}</Text>
            <Text style={styles.orderprice}>{item.price}</Text>
          <View style={styles.orderdetails}>
            <Animatable.View animation="pulse" iterationCount="infinite" duration={2000} iterationDelay={800}>

          <Image source={{ uri: item.image }} style={styles.orderimage} />
            </Animatable.View>
          </View>
        </View>
      ))}
    </View>
      </ScrollView>
  );
};
const styles = StyleSheet.create({
  orderview: {
    paddingTop: 50,
    backgroundColor: "white"

  },
  ordertext: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft:20
  },
  
  orderanimation: {
    height: 170,
    alignSelf: "center",
    marginBottom: 30,
  },
  orderfoodcontainer: {
      flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    paddingLeft:10
  },
  orderitemcontainer: {
    
    flexDirection: 'column',
    alignItems: "flex-start",
    marginBottom: 5,
  },
  orderimage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  orderdetails: {
    paddingBottom:1
  },
  ordertitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderprice: {
    fontSize: 14,
    color: 'gray',
  },
  viewcartitemscontainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignContent: "flex-start",
  }
});

export default OrderComplete;