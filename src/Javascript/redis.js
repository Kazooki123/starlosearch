// Instead of using import, use require
const redis = require('redis');

// Replace the following values with your actual Redis Insight connection details
const redisHost = 'REDIS_HOST';
const redisPort = REDIS_PORT;
const redisPassword = 'REDIS_PASSWORD';
// Replace REDIS_HOST with your host url that can be found in your Redis cloud database
// Replace REDIS_PORT to your port, example: 14322
// Replace REDIS_PASSWORD with your actual Redis password, I'll keep mine as a secret.

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
