import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'

// const yelpRestaurantInfo = {
//   name: "Super Duper Mcdonalds",
//   image: "https://media.vandalsports.com/i/640x360/1-2023/2023125144111_1.jpg",
//   price: "$$",
//   ratings:5,
//   reviews: 5,
//   categories: [{ title: "Thai" }, { title: "Comfort Food" }]
// };

// const {name,image,price,reviews,ratings,categories}=yelpRestaurantInfo

// const formattedCategories = categories.map((cat) => cat.title).join(" - ")

// const description=`${formattedCategories} ${price? " . "+ price: ""} 🎫 ${ratings} ⭐ ${reviews}+`

// const image = "https://media.vandalsports.com/i/640x360/1-2023/2023125144111_1.jpg"
// const Title = "super duper mcdonalds"
// const description="Fast Food-Burgers-Fries- $$ - 🎫- 4 ⭐ - (2198+)"
const About = (props) => {

  const { name, image, price, reviews, ratings, categories } = props.route.params
  //en el objeto de arriba pasamos la informacion que nos viene de route  desde restaurantitem

const formattedCategories = categories.map((cat) => cat.title).join(" - ")

const description=`${formattedCategories} ${price? " . "+ price: ""} 🎫 ${ratings} ⭐ ${reviews}+`
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />

    </View>
  )
}

const RestaurantImage = (props) => (
  <Image source={{uri:props.image}} style={styles.restoimg} />
)
const RestaurantName = (props) => (
  <Text style={styles.restoname}>{props.name}</Text>
)
const RestaurantDescription = (props) => (
  <Text style={styles.restodescription}>{props.description}</Text>
)
const styles = StyleSheet.create({
  restoimg: {
    width: "100%",
    height:180
  },
  restoname: {
    fontSize: 29,
    fontWeight: "700",
    marginTop: 10,
    marginHorizontal:15,
  },
  restodescription: {
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: "500",
    fontSize:15.5,
  }
});
export default About