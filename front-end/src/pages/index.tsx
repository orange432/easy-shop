import {useState, useEffect} from 'react'
import { APICall } from '../util/api'
import styled from '@emotion/styled'
import LoadingScreen from '../components/loading-screen'

const Title = styled.h1`
  text-align: center;
`

const Index = () => {
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(true);

  const loadItems = ()=>{
    const query = `
      query{
        LoadItems(page: 0){
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
      setItems(data.LoadItems);
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
    </div>
  )
}

export default Index
