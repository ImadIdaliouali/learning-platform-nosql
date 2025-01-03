// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse :
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse :

const { MongoClient } = require("mongodb");
const redis = require("redis");
const config = require("./env");

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    mongoClient = new MongoClient(config.mongodb.uri);
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  try {
    redisClient = redis.createClient(config.redis.uri);
    redisClient.on("error", (err) => console.error(err));
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
}

async function closeMongo() {
  // TODO: Implémenter la fermeture de la connexion MongoDB
  try {
    await mongoClient.close();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
  }
}

async function closeRedis() {
  // TODO: Implémenter la fermeture de la connexion Redis
  try {
    redisClient.quit();
    console.log("Redis connection closed");
  } catch (err) {
    console.error("Error closing Redis connection:", err);
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  closeMongo,
  closeRedis,
  getMongoDb: () => db,
  getRedisClient: () => redisClient,
};
