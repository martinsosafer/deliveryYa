import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, ScrollView,} from 'react-native';
import { Divider } from "react-native-elements"
import BouncyCheckBox from "react-native-bouncy-checkbox"
import {useDispatch, useSelector} from "react-redux"
const foods = [
  {
    title: "Big Mac",
    description: "The Big Mac contains two beef patties, cheese, shredded lettuce, pickles, minced onions, and a Thousand Island-type dressing advertised as 'special sauce'.",
    price: "$5",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0005_BigMac_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off"
  },
  {
    title: "Sushi",
    description: "Sushi is a traditional Japanese dish consisting of vinegared rice, various toppings such as raw fish or seafood, and sometimes vegetables, wrapped in seaweed.",
    price: "$10",
    image: "https://media.istockphoto.com/id/1298575561/es/foto/selecci%C3%B3n-de-sushi-fresco-en-tablero-de-madera.jpg?s=612x612&w=0&k=20&c=SRHjKG2c9N3lBT_37IWNJX6erSIi_0rxVOg9ygjHtPs="
  },
  {
    title: "Tacos",
    description: "A taco is a traditional Mexican dish made with a tortilla filled with various ingredients, such as seasoned meat, cheese, lettuce, and salsa.",
    price: "$3",
    image: "https://www.comedera.com/wp-content/uploads/2017/08/tacos-al-pastor-receta.jpg"
  },
  {
    title: "Pad Thai",
    description: "Pad Thai is a popular Thai stir-fried noodle dish made with rice noodles, eggs, tofu, shrimp or chicken, bean sprouts, peanuts, and lime.",
    price: "$8",
    image: "https://tastesbetterfromscratch.com/wp-content/uploads/2018/08/Pad-Thai-Web-7.jpg"
  },
  {
    title: "Croissant",
    description: "A croissant is a buttery, flaky pastry of French origin. It is made of a layered yeast-leavened dough and is often enjoyed for breakfast or as a snack.",
    price: "$3",
    image: "https://www.vidactual.com/rcpmaker/wp-content/uploads/2021/05/Croissant_huevos_poche-1.png"
  },
  {
    title: "Hamburger",
    description: "A hamburger is a classic American dish consisting of a ground beef patty, typically grilled, served on a bun and topped with various condiments and vegetables.",
    price: "$6",
    image: "https://media.istockphoto.com/id/1309352410/es/foto/hamburguesa-con-queso-con-tomate-y-lechuga-en-tabla-de-madera.jpg?s=612x612&w=0&k=20&c=HaSLXFFns4_IHfbvWY7_FX7tlccVjl0s0BrlqaLHOTE="
  },
  {
    title: "Pasta Carbonara",
    description: "Pasta Carbonara is an Italian pasta dish made with spaghetti, eggs, pancetta or bacon, grated cheese, and black pepper. It is rich, creamy, and flavorful.",
    price: "$12",
    image: "https://i.blogs.es/8819e1/carbonara-rec/1366_2000.jpg"
  },
  {
    title: "Falafel",
    description: "Falafel is a Middle Eastern dish made from ground chickpeas or fava beans, mixed with herbs, spices, and onion. It is deep-fried and often served in a pita bread with tahini sauce.",
    price: "$5",
    image: "https://images.hola.com/imagenes/cocina/recetas/20200327164281/falafel-tradicional/0-804-456/falafel-tradicional-m.jpg"
  },
  {
    title: "Sushi Burrito",
    description: "A sushi burrito is a fusion food that combines elements of sushi and burritos. It typically consists of sushi rice, various fillings such as raw fish or vegetables, and is wrapped in a seaweed sheet.",
    price: "$10",
    image: "https://riceinfo.com/wp-content/uploads/2019/05/VEGAN-SUSHI-BURRITO.jpg"
  },
  {
    title: "Paella",
    description: "Paella is a Spanish rice dish that originated in the Valencia region. It is typically made with saffron-infused rice, various meats or seafood, vegetables, and spices.",
    price: "$15",
    image: "https://www.nestleprofessional-latam.com/sites/default/files/styles/np_recipe_detail/public/2022-07/paella.png?itok=CBvKkcsa"
  },
  {
    title: "Moussaka",
    description: "Moussaka is a traditional Greek dish made with layers of eggplant, ground meat (typically beef or lamb), onions, tomatoes, and béchamel sauce. It is then baked to perfection.",
    price: "$12",
    image: "https://www.recipetineats.com/wp-content/uploads/2019/03/Greek-Moussaka_3-re-edited-SQ.jpg"
  },
]

const MenuItems = ({restaurantName,hideCheckbox ,marginLeft,food}) => {
  
  const dispatch = useDispatch()
  //aqui arreglamos el bug de que cuando salimos del restaurant se mantiene el precio del carrito
  const cartItems = useSelector(state => state.cartReducer.selectedItems.items)
  const [displayedFoods, setDisplayedFoods] = useState([])
  
  useEffect(() => {
    const randomizedMenu = getRandomMenu();
    setDisplayedFoods(randomizedMenu);
  }, []);

 // recordar que el menu no es considerado por yelp api , asi que estoy trabajando con un menu harcodeado , tenemos que establecer en restaurantName desde el about ya que no tiene coneccion con el menu de nuestra aplicacion 
  //podemos tener el checkbox value del onpress del bouncycheckbox(para saber si esta el tick o no esta , esto nos ayuda a saber si se agrega al carrito o no el item)
   const getRandomMenu = () => {
    const menuSize = Math.floor(Math.random() * (foods.length - 1)) + 1; // ramdomizo el numero de items en el menu
    const shuffledFoods = [...foods].sort(() => Math.random() - 0.5); // randomizo el orden
    return shuffledFoods.slice(0, menuSize); // con esto el menu solo puede ser de 12 items , osea de la cantidad de items de mi obj
  };

  const selectItem = (item,checkboxValue) => dispatch({
  type: "ADD_TO_CART",
    payload: {
      ...item,
      restaurantName: restaurantName,
      checkboxValue: checkboxValue
    }
  })
  
  
  const isFoodInCart = (food, cartItems) => 
    Boolean(cartItems.find((item)=>item.title===food.title))
 
 



  
  return (
      
    <View>
      <ScrollView style={styles.scrollviewmenu}>
    {displayedFoods.map((food, index) => (
      
      
      <View key={index}>

        <View style={styles.menuitemstyle}>
          {hideCheckbox?(<></>):( <BouncyCheckBox iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
            fillColor='#FF4500'
            onPress={(checkboxValue) => selectItem(food, checkboxValue)}
            isChecked={isFoodInCart(food,cartItems)}
          />
        )}
        <FoodInfo food={food}/>
          <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
        </View>
        <Divider width={1} style={{marginHorizontal:20}} />
      </View>
     
     ))}
      </ScrollView>
     
     </View>
  )
}

const FoodInfo = (props) => (
  <View style={styles.foodinfoview}>
    <Text style={styles.menuitemtittle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
    
  </View>
)
const FoodImage = (props) => (
  <View>
    <Image source={{ uri: props.food.image }} style={styles.menuitemimg} />
  </View>
)
const styles = StyleSheet.create({
    scrollviewmenu: {
    height: 600, // El scroll view no estaba renderizando todos los contenidos, aparentemente a veces tiene un limite de cuanto puede renderizar , el problema fue solucionado otorgandole un height aproximado!
  },
  foodinfoview: {
    width: 240,
    justifyContent:"space-evenly"
  },
  menuitemstyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20
  },
  menuitemtittle: {
    fontSize: 20,
    fontWeight:"700"
  },
  menuitemimg: {
    width: 100,
    height: 100,
    borderRadius:8
  }
});

export default MenuItems





