import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';

import { createUser } from './controllers/users';
import { login, authorizeSession } from './controllers/sessions';
import { listItems,listAllItems,getItem,createItem } from './controllers/items';

interface EmailPassword{
  email: string;
  password: string;
}

type ShopItem = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  quantity?: number;
}
const schema = buildSchema(`

input ItemInput{
  _id: String
  name: String
  description: String
  category: String
  price: Float
  image: String
}

type Item{
  _id: String
  name: String
  description: String
  category: String
  price: Float
  image: String
}

type CartItem{
  _id: String
  name: String
  description: String
  category: String
  price: Float
  quantity: Int
  image: String
}

input BasicCartItem{
  _id: String
  quantity: Int
}

type UserResponse{
  success: Boolean!
  email: String
  role: String
  error: String
}

type SuccessResponse{
  success: Boolean!
  error: String
  payload: String
  code: String
}

type Query{
  test: Boolean
  ListItems(page: Int): [Item!]!
  ListAllItems: [Item!]!
  Authorize(session: String): UserResponse!
  GetItem(_id: String): Item
  LoadCart(input: [BasicCartItem]): [CartItem!]!
}

type Mutation{
  CreateUser(email: String,password: String): SuccessResponse!
  Login(email: String, password: String): SuccessResponse!
  SaveItem(session: String, input: ItemInput): SuccessResponse
}
`)

const root = {
  test: ()=>{
    return true;
  },
  CreateUser: async (args: EmailPassword) => {
    let result = await createUser(args.email,args.password);
    return result;
  },
  Login: async (args: EmailPassword) => {
    let result = await login(args.email,args.password);
    return result;
  },
  Authorize: async (args: {session: string})=>{
    let session: any = await authorizeSession(args.session);
    if(session.success){
      return {success: true, email: session.payload.email, role: session.payload.role}
    }
    return session;
  },
  GetItem: async (args: {_id: string}) => {
    let result = await getItem(args._id);
    return result;
  },
  ListItems: async (args: {page: number}) => {
    let result =  await listItems(args.page);
    return result;
  },
  ListAllItems: async () => {
    let result = await listAllItems();
    return result;
  },
  SaveItem: async (args: {session: string, input: ShopItem}) => {
    let session: any = await authorizeSession(args.session);
    if(session.success){
      let result = await createItem(args.input._id,args.input.name,args.input.description,args.input.category,args.input.price,args.input.image);
      return result;
    }
    return session;
  }
}

const GQL = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
});

export {root} // for testing
export default GQL;