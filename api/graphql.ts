import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';

import { createUser } from './controllers/users';
import {login, authorizeSession} from './controllers/sessions' 

interface EmailPassword{
  email: string;
  password: string;
}

const schema = buildSchema(`
type SuccessResponse{
  success: Boolean!
  error: String
  payload: String
  code: String
}
type Query{
  test: String
  createUser(email: String,password: String): SuccessResponse!
  login(email: String, password: String): SuccessResponse!
}
`)

const root = {
  test: ()=>{
    return true;
  },
  createUser: async (args: EmailPassword) => {
    let result = await createUser(args.email,args.password);
    return result;
  },
  login: async (args: EmailPassword) => {
    let result = await login(args.email,args.password);
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