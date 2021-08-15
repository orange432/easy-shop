import {useState, useEffect} from 'react'
import { APICall } from '../util/api'
import styled from '@emotion/styled'
import LoadingScreen from '../components/loading-screen'
import ItemCard from '../components/item-card'

const Title = styled.h1`
  text-align: center;
`

const Index = () => {
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(true);

  const loadItems = ()=>{
    const query = `
      query{
        ListItems(page: 0){
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
      setItems(data.ListItems);
      setLoading(false);
    })
  }

  useEffect(()=>{
    loadItems();
  },[])
  if(loading){
    return <LoadingScreen/>
  }
  return (
    <div>
      <Title>Easy Shop</Title>
      {items.map((item: ShopItem)=>(
        <ItemCard _id={item._id} name={item.name} description={item.description} category={item.category} price={item.price} image={item.image}/> 
      ))}
    </div>
  )
}

export default Index
