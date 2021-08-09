const {getClient} = require('./mongo');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcrypt');

const dbName = 'user';
const collectionName = 'userLogin';
const saltRounds = 12;

// Hashing password, setting dateEntered and dateModified, and inserting into MongoDB
async function insertUser(user) {
  const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
  user.password = hashedPassword;
  user.dateEntered = new Date();
  user.dateModified = new Date();
  const client = await getClient();
  const {insertedId} = await client.db(dbName).collection(collectionName).insertOne(user);
  return insertedId;
}

// Querying for all users
async function getUsers() {
  const client = await getClient();
  return await client.db(dbName).collection(collectionName).find({}).toArray();
}

// Querying for user and attempting to complete the login process
async function loginUser(user) {
  const client = await getClient();
  const loginResponse = await client.db(dbName).collection(collectionName).find({username: user.username}).toArray();
  if(loginResponse.length === 0)
    return null;

  const success = await bcrypt.compare(user.password, loginResponse[0].password);
  if(!success)
    return null;

  return loginResponse[0]._id;
}

// Delete user from db
async function deleteUser(id) {
  const client = await getClient();
  await client.db(dbName).collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

// Update user in db
async function updateUser(id, user) {
  const client = await getClient();
  delete user._id;
  await client.db(dbName).collection(collectionName).update(
    { _id: new ObjectID(id), },
    {
      $set: {
        ...user,
      },
    },
  );
}

// Exporting user repo functions to be used in index
module.exports = {
  insertUser,
  getUsers,
  loginUser,
  deleteUser,
  updateUser,
};