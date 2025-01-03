// Question: Pourquoi créer des services séparés ?
// Réponse:

const { ObjectId } = require("mongodb");
const db = require("../config/db");

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  const document = await db
    .getMongoDb()
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });
  return document;
}

async function findMany(collection, query = {}) {
  // TODO: Implémenter une fonction générique de recherche multiple
  const documents = await db
    .getMongoDb()
    .collection(collection)
    .find(query)
    .toArray();
  return documents;
}

async function insertOne(collection, data) {
  // TODO: Implémenter une fonction générique d'insertion
  const document = await db.getMongoDb().collection(collection).insertOne(data);
  return document;
}

async function updateOne(collection, id, data) {
  // TODO: Implémenter une fonction générique de mise à jour
  const document = await db
    .getMongoDb()
    .collection(collection)
    .updateOne({ _id: new ObjectId(id) }, data);
  return document;
}

async function deleteOne(collection, id) {
  // TODO: Implémenter une fonction générique de suppression
  const document = await db
    .getMongoDb()
    .collection(collection)
    .deleteOne({ _id: new ObjectId(id) });
  return document;
}

async function aggregate(collection, pipeline) {
  // TODO: Implémenter une fonction générique d'agrégation
  const documents = await db
    .getMongoDb()
    .collection(collection)
    .aggregate(pipeline)
    .toArray();
  return documents;
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  findMany,
  insertOne,
  updateOne,
  deleteOne,
  aggregate,
};
