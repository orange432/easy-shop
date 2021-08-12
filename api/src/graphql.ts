import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';

import { createUser } from './controllers/users';
import { login, authorizeSession } from './controllers/sessions';
import { listItems,getItem,createItem } from './controllers/items';

interface EmailPassword{
  email: string;
  password: string;
}

const schema = buildSchema(`

type Item{
  _id: String
  name: String
  description: String
  category: String
  price: Float
  image: String
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
  ListAllItems(): [Item!]!
  Authorize(session: String): UserResponse!
}
type Mutation{
  CreateUser(email: String,password: String): SuccessResponse!
  Login(email: String, password: String): SuccessResponse!
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
  ListItems: async (args: {page: number}) => {
    let result =  await listItems(0);
    return result;
  }
}

const GQL = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
});

export {root} // for testing
export default GQL;