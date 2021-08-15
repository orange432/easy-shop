import React from 'react'
import styled from '@emotion/styled';
import { IMAGE_ROUTE } from '../constants';

const Card = styled.div`
  border: 1px solid lightblue;
  border-radius: 4px;
  padding: 4px;
  a{
    text-decoration: none;
    color: #111;
    display: block;
  }
`

const Image = styled.img`
  margin: 0 auto;
  border: 1px solid black;
  display: block;
`

const Text = styled.div`
  text-align: center;
  padding: 5px;
`
const Category = styled.div`
  display: inline;
  text-align: center;
  background: rebeccapurple;
  color: #fff;
  text-transform: uppercase;
  padding: 2px;
  font-size: 12px;
`

// Fix the props to make it only one prop object
interface Props{
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const ItemCard: React.FC<Props> = (props) => {
  return (
    <Card>
      <a href={`/items/${props._id}`}>
        <Image src={`${IMAGE_ROUTE}${props.image}`} alt="" />
        <Text>{props.name}</Text>
        <Text>{props.price}</Text>
        <Category>{props.category}</Category>
      </a>
    </Card>
  )
}

export default ItemCard
