// Instead of using import, use require
const redis = require('redis');

// Replace the following values with your actual Redis Insight connection details
const redisHost = 'redis-19035.c302.asia-northeast1-1.gce.cloud.redislabs.com';
const redisPort = 19035;
const redisPassword = 'hDXBdzvuWmByNNkuhYqfg4khLZACzma5';

const client = createClient({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
});

// Redis event listeners
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis Error:', err);
});

export default client;
