import request from 'supertest';
import app from './app';

describe('Routes return correct status code',()=>{
  test('/',()=>{
    return request(app)
      .get('/')
      .then(response=>{
        expect(response.statusCode).toBe(200);
      })
  })
  test('/_graphql',()=>{
    // GraphQL requires a query to return 200
    const testQuery = `
    query{
      test
    }
    `
    return request(app)
      .post('/_graphql')
      .send({query: testQuery})
      .then(response=>{
        expect(response.statusCode).toBe(200);
      })
  })
})