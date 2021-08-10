import redis from 'ioredis';
const Redis = new redis();

const Session = {
  get: (a: any) => { return Redis.get(a)},
  set: (a:any,b:any,c:any,d:any) => {return Redis.set(a,b,c,d)}
  // set: redis.set
};

export default Session;