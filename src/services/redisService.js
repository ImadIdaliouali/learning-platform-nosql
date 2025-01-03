// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

const db = require("../config/db");

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  // TODO: Implémenter une fonction générique de cache
  try {
    const client = db.getRedisClient();
    await client.set(key, JSON.stringify(data));
    await client.expire(key, ttl);
    console.log(`Data cached with key: ${key}`);
  } catch (error) {
    console.error("Error caching data:", error);
  }
}

async function getCachedData(key) {
  // TODO: Implémenter une fonction générique pour récupérer les données mises en cache
  try {
    const client = db.getRedisClient();
    const cachedData = await client.get(key);
    if (!cachedData) {
      return null;
    }
    console.log(`Data retrieved from cache with key: ${key}`);
    return JSON.parse(cachedData);
  } catch (error) {
    console.error("Error getting cached data:", error);
  }
}

async function deleteCachedData(key) {
  try {
    const client = db.getRedisClient();
    await client.del(key);
    console.log(`Data deleted from cache with key: ${key}`);
  } catch (error) {
    console.error("Error deleting cached data:", error);
  }
}

module.exports = {
  // TODO: Exporter les fonctions utilitaires
  cacheData,
  getCachedData,
  deleteCachedData,
};
