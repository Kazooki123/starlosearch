const Redis = require('ioredis');
const redisClient = new Redis({
  host: 'redis-19035.c302.asia-northeast1-1.gce.cloud.redislabs.com:19035',
  port: 19035,
  password: 'hDXBdzvuWmByNNkuhYqfg4khLZACzma5',
});

async function saveSearchQuery(query) {
  try {
    // Get the existing search history from Redis
    let searchHistory = await redisClient.get('searchHistory');

    // Parse the search history JSON string into an array or create an empty array if it doesn't exist
    searchHistory = searchHistory ? JSON.parse(searchHistory) : [];

    // Add the new search query to the search history array
    searchHistory.push(query);

    // Save the updated search history back to Redis
    await redisClient.set('searchHistory', JSON.stringify(searchHistory));
  } catch (error) {
    console.error('Error saving search query:', error);
  }
}
 
async function getSearchHistory() {
  try {
    // Retrieve the search history from Redis
    let searchHistory = await redisClient.get('searchHistory');

    // Parse the search history JSON string into an array or return an empty array if it doesn't exist
    return searchHistory ? JSON.parse(searchHistory) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
}

async function clearSearchHistory() {
  try {
    // Remove the search history from Redis
    await redisClient.del('searchHistory');
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
}