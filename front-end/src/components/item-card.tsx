import React from 'react'
import styled from '@emotion/styled';

const Card = styled.div`
  border: 1px solid lightblue;
  border-radius: 4px;
  
`

interface Props{
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

const ItemCard: React.FC<Props> = (props) => {
  return (
    <div>
      
    </div>
  )
}

export default ItemCard
