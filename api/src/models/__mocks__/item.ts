export default {
  findOne: () =>({
    _id: '507f191e810c19729de860ea',
    name: 'Test Item A',
    description: 'This is a test item.',
    category: 'test',
    price: 19.99,
    image: '/images/test.jpg'
  }),
  find: ()=>([{
    _id: '507f191e810c19729de860ea',
    name: 'Test Item A',
    description: 'This is a test item.',
    category: 'test',
    price: 19.99,
    image: '/images/test.jpg'
  },{
    _id: '507f191e810c19729de860eb',
    name: 'Test Item BA',
    description: 'This is another test item.',
    category: 'test',
    price: 29.99,
    image: '/images/test.jpg'
  }]),
  create: () =>({
    _id: '507f191e810c19729de860ea',
    name: 'Test Item A',
    description: 'This is a test item.',
    category: 'test',
    price: 19.99,
    image: '/images/test.jpg'
  }),
  findByIdAndUpdate: () => ({
    _id: '507f191e810c19729de860ea',
    name: 'Test Item A',
    description: 'This is a test item.',
    category: 'test',
    price: 19.99,
    image: '/images/test.jpg'
  })
}