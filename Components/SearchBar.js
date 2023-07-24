import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
const SearchBar = ({cityHandler}) => {
  return (
    <View style={searchstyles.searchview}>
      <GooglePlacesAutocomplete query={{ key: "AIzaSyDoiVOUxwHU4KK4FQNGoKd9t5F0zrmGv3g" }}
        onPress={(data, details = null) => {
          console.log(data.description)
          const city = data.description.split(',')[0]
          cityHandler(city)
        }}
        placeholder='Buscar' styles={{
        textInput: {
          backgroundColor: "#eee",
          borderRadius: 20,
          fontWeight:"700",
          marginTop:7
        },
        textInputContainer: {
          backgroundColor: "#eee",
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
          marginRight:10
        }
      }}
        renderLeftButton={() => (
          <View style={{marginLeft:10}}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View style={{
            flexDirection: "row",
            marginRight: 8,
            backgroundColor: "#FF6347",
            padding: 9,
            borderRadius: 30,
            alignItems: "center",
            
          }}>
            <AntDesign name="clockcircle" size={20} style={{ marginRight:6} } />
            <Text style={searchstyles.searchtext}>Search</Text>
          </View>
        )}
      />
    </View>
  )
}
searchstyles = StyleSheet.create({
  searchview: {
    marginTop: 15,
    flexDirection:"row"
  },
  searchtext: {
    fontWeight:"bold"
  }
})
export default SearchBar
//Notas
// en este archivo se cambio la forma de dar estilo , en vez de styles tuve que poner searchstyles por que googleplacesautocomplete ya viene con una opcion styles ya incluida , de esta forma puedo cambiar la opciones de su searchbar con opciones ya incluidas, recordar checkear la documentacion para ver cuales son las opciones definidas por la barra de busqueda de google.
//Tambien si leemos la documentacion de googleautocomplete. podemos renderizar un icono a la derecha de la barra search facilmente , solamente con render right button