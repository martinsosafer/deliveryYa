import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Modal } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import OrderItem from "./OrderItem";
import LottieView from 'lottie-react-native';
import fastfood from "./fastfood.json"
import firebase from '../../firebase';
const ViewCart = ({navigation}) => {
  const [modalVisible,setModalVisible]=useState(false)

  const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems)
  //ahora mapeamos los items y obtenemos el precio de cada uno , usamos replace $ para no tener el simbolo y poder trabajar el precio como un numero por ej $13.50 luego del replace sera => 13.50 y podemos usar number , estos terminaran en una array y puedo sumarlos con la reduce function 
  const total =items.map((item=>Number(item.price.replace("$", "")))).reduce((prev,curr)=> prev+ curr ,0)
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD"
   
  })
  const addOrderToFirebase = () => {
    const db = firebase.firestore();
    db.collection("orders").add({
      items: items,
      restaurantName: restaurantName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setModalVisible(false)
    navigation.navigate("OrderComplete")
  }
  
  const checkoutModalContent = () => {
    return (
      <>
        
        <View style={styles.modalcontainer}>
          <View style={styles.modalcheckoutcontainer}>
            <Text style={styles.restaurantnamemodal}>{restaurantName}</Text>
            {/* items esta saliendo de redux state, de los estados que tengo guardado en el carrito gracias a redux */}
            {items.map((item, index) => (
              <OrderItem key={index} item={item}/>
            ))}
            <View style={styles.subtotalcontainer}>
              <Text style={styles.subtotaltext}>Total</Text>
              <Text style={styles.totalusdmodal}>{totalUSD}</Text>
            </View>
            <View style={styles.comprarbuttonview}>
              <TouchableOpacity style={styles.comprarbutton} onPress={() => {
                addOrderToFirebase();
              }}>
                <Text style={styles.comprartext}>Comprar</Text>
          <View style={styles.animationContainer}>
          <LottieView
            source={fastfood}
            autoPlay
            loop
            style={{ width: 50, height:50 ,}}
          />
        </View>
              </TouchableOpacity>
            </View>
        </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Modal animationType='slide'
        visible={modalVisible}
        transparent={true}
        onRequestClose={()=>setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View style={styles.container}>
          <View style={styles.viewCartContainer}>
            <TouchableOpacity style={styles.opacityViewCart}
            onPress={()=>setModalVisible(true)}
            >
             
              <FontAwesome5 name="shopping-cart" size={19} style={styles.shoppingcart} />
              <Text style={styles.viewCartText}>Carrito</Text>
              <Text style={{color:"#FF4500" ,fontSize:20,marginRight:20}}>{totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
          //si no hay nada en el carrito , renderiza un fragmento vacio
        <></>)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    
  },
  viewCartContainer: {
    position: "absolute",
    bottom: 10,
    
    alignItems: "center",
  },
  opacityViewCart: {
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
    justifyContent:"flex-end",
    borderRadius: 30,
    width: 300,
    paddingVertical: 15,
    
    
  },
  viewCartText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight:50
  },
  shoppingcart: {
    color: "white",
    marginRight:10
  },
  modalcontainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)" 
    // flex end es para que aparezca al final y flex 1 para que tome toda la pantalla 
  },
  modalcheckoutcontainer: {
    backgroundColor: "white",
    padding: 16,
    // height: 500,
    borderWidth:1
    
  },
  restaurantnamemodal: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    marginBottom:10
  },
  subtotalcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    padding:20
  },
  subtotaltext: {
    textAlign: "left",
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 10,
    color: '#FF4500'
  },
  totalusdmodal: {
    color:"#00B300"
  },
  comprarbuttonview: {
    flexDirection: "row",
    justifyContent: "center"
  },
  comprarbutton: {
    marginTop: 20,
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 38,
    width: 150,
    position:"relative"
  },
  comprartext: {
    fontWeight: 600,
    fontSize: 20,
    color: "#00B300",
    marginLeft:8
  }
});

export default ViewCart;
