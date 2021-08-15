import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../components/loading-screen';
import { IMAGE_ROUTE } from '../constants';
import { APICall } from '../util/api';


const Item = () => {
  const params: {id: string} = useParams();
  const { id } = params

  const [item,setItem] = useState<ShopItem>();
  const [loading,setLoading] = useState(true);

  const loadItem = () => {
    const query = `
      query{
        GetItem(_id: ${id}){
          name
          description
          price
          category
          image
        }
      }
    `
    APICall(query)
    .then(({data})=>{
      setItem(data.GetItem)
      setLoading(false);
    })
  }

  if(loading){
    return <LoadingScreen/>
  }
  if(!item?.name){
    return (
      <div>Item not found!</div>
    )
  }
  return (
    <div>
      {item?.name}
      {item?.description}
      {item?.price}
    </div>
  )
}

export default Item
