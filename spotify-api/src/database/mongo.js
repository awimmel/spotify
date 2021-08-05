const {MongoClient} = require('mongodb');
const config = require('../../config.json');

const client = MongoClient(config.mongoURI, { useUnifiedTopology: true });

async function startClient() {
  try{
    await client.connect();
  } catch(error) {
    console.error(e);
  } finally {
    return client;
  }
}

async function getClient() {
  return client;
}

async function closeClient() {
  if (client){
    await client.close();
  }
}

module.exports = {
  startClient,
  getClient,
  closeClient,
};