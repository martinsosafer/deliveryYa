let defaultState = {
  selectedItems:{items:[],retaurantName:""}
}

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      //si añadimos a carro el estado se actualiza gracias a redux, trameos al item que ya estaba antes(puede ser multiples comidas) mas el nombre del restaurante
      let newState = { ...state };
      if (action.payload.checkboxValue) {
        
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName
        };
      //si sacamos el tic del checkbox esto sucede
      } else {
        console.log("remove from cart 🦊")
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.payload.title)
          ],
          restaurantName:action.payload.restaurantName 
        }
      }
      console.log(newState, "😀");
        return newState
      }
    default:
      return state;
  }
  }


export default cartReducer