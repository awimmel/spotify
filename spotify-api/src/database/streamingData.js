const {getClient} = require('./mongo');

const dbName = 'user';
const collectionName = 'rawStreamingData';

async function insertRawData(data) {
  const client = await getClient();
  let successfulInsert = null;
  try {
    await client.db(dbName).collection(collectionName).insertOne(data);
    successfulInsert = true;
  } catch {
    successfulInsert = false;
  }
  return successfulInsert;
}

async function retrieveRawData(currentUserId) {
  const client = await getClient();
  const response = await client.db(dbName).collection(collectionName).find({userId: currentUserId}).toArray();
  if(response.length === 0)
    return [];
  
  
  return response[0].songs;
}

async function insertArtistData(data) {
  const client = await getClient();
  const {insertedId} = await client.db(dbName).collection(collectionName).insertMany(data);
  return insertedId;
}

// Exporting user repo functions to be used in index
module.exports = {
  insertArtistData,
  retrieveRawData,
  insertRawData
};