import React,{useContext,createContext, useState} from "react";
import { APICall } from "../util/api";

const CartContext = createContext({});

export const useCart = () => (useContext(CartContext));

export const CartProvider: React.FC = ({children}) => {
  const [cart,setCart] = useState([]);
  const [itemList, setItemList] = useState([]);

  // Loads the cart from localStorage
  const loadCart = () => {
    let storage = localStorage.getItem('cart') || '[]';
    return JSON.parse(storage);
  }

  // Lists every item in the shop
  const listAllItems = () => {
    const query = `
      query{
        ListAllItems{
          _id
          name
          description
          category
          price
          image
        }
      }
    `

    APICall(query)
    .then(({data})=>{
      setItemList(data.ListAllItems);
    })
  }

  //Adds an item to the cart
  const addItem = (id: string, quantity: number) => {
    let storage = loadCart();
    let search = storage.findIndex((item: ShopItem)=>item._id===id);
    if(search<0){
      storage[search].quantity+=quantity;
    }else{
      
    }
  }

  const ctxValues = {
    cart,
    loadCart,
    addItem
  }
  return(
    <CartContext.Provider value={ctxValues}>
      {children}
    </CartContext.Provider>
  )
}