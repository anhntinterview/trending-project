import redis from 'redis';
import { Service } from 'typedi';
import util from 'util';

@Service()
class RedisService {
  client = redis.createClient();

  setExAsync = util.promisify(this.client.setEx).bind(this.client);

  public async start() {
    this.client.on('connect', (err) => {
      err ? console.log('Redis Client Error', err) : console.log('Redis connected!');
    });
    await this.client.connect();
  }

  public async end() {
    await this.client.disconnect().then(() => {
      this.client.off('disconnect', (err) => {
        err ? console.log('Redis Client Error', err) : console.log('Redis disconnect!');
      });
    });
  }

  constructor() {}
}

export default RedisService;
