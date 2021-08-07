import Redis from 'ioredis';
const redis = new Redis();

const Session = {
  get: redis.get,
  set: redis.set
};

export default Session;