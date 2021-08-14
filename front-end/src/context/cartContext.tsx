import React,{useContext,createContext, useState} from "react";
import { APICall } from "../util/api";

const CartContext = createContext({});

export const useCart = () => (useContext(CartContext));

export const CartProvider: React.FC = ({children}) => {
  const [cart,setCart] = useState([]);

  // Loads the cart from localStorage
  const loadCart = () => {
    let storage = localStorage.getItem('cart') || '[]';
    return JSON.parse(storage);
  }

  // Saves cart to localstorage
  const saveCart = (cart: ShopItem[]) => {
    localStorage.setItem('cart',JSON.stringify(cart));
  }

  //Adds an item to the cart
  const addToCart = (id: string, quantity: number) => {
    let storage = loadCart();
    let search = storage.findIndex((item: ShopItem)=>item._id===id);
    if(search<0){
      storage[search].quantity+=quantity;
    }else{
      storage.push({_id: id, quantity})
    }
    saveCart(storage);
  }

  // Loads cart item data into the cart state
  const refreshCart = () => {
    
  }

  const ctxValues = {
    cart,
    addToCart,
    refreshCart
  }
  return(
    <CartContext.Provider value={ctxValues}>
      {children}
    </CartContext.Provider>
  )
}