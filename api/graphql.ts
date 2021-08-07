import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';

const schema = buildSchema(`
type Query{
  test: String
}
`)

const root = {
  test: ()=>{
    return true;
  }
}

const GQL = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
});

export {root} // for testing
export default GQL;