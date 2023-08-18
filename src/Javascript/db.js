const redis = require('redis');

const client = redis.createClient();

// Set a key-value pair in Redis
client.set('key', 'value', redis.print);

// Get the value of a key from Redis
client.get('key', function (err, reply) {
  console.log(reply); // This will log 'value' if 'key' exists in Redis
});
