const {getClient} = require('./mongo');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcrypt');
const mongo = require('mongodb');

const dbName = 'user';
const userCollectionName = 'userLogin';
const sessionCollectionName = 'sessions';
const saltRounds = 12;

// Hashing password, setting dateEntered and dateModified, and inserting into MongoDB
async function insertUser(user) {
  const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
  user.password = hashedPassword;
  user.jsonEntered = false;
  user.dateEntered = new Date();
  user.dateModified = new Date();
  const client = await getClient();
  const {insertedId} = await client.db(dbName).collection(userCollectionName).insertOne(user);
  return insertedId;
}

// Querying for all users
async function getUsers() {
  const client = await getClient();
  return await client.db(dbName).collection(userCollectionName).find({}).toArray();
}

// Querying for user and attempting to complete the login process
async function loginUser(user, session) {
  const client = await getClient();
  const loginResponse = await client.db(dbName).collection(userCollectionName).find({username: user.username}).toArray();
  if(loginResponse.length === 0)
    return null;

  const success = await bcrypt.compare(user.password, loginResponse[0].password);
  if(!success)
    return null;

  const userId = loginResponse[0]._id;
  session.userId = userId;
  session.username = user.username;

  return session;
}

// Delete user from db
async function deleteUser(id) {
  const client = await getClient();
  await client.db(dbName).collection(userCollectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

// Update user in db
async function updateUser(id, user) {
  const client = await getClient();
  delete user._id;
  await client.db(dbName).collection(userCollectionName).update(
    { _id: new ObjectID(id), },
    {
      $set: {
        ...user,
      },
    },
  );
}

async function validateSession(session){
  const client = await getClient();
  const sessionResponse = await client.db(dbName).collection(sessionCollectionName).find({}).toArray();
  const matchingSessions = sessionResponse.filter(response =>
    JSON.parse(response.session).userId == session.userId
  );

  if(matchingSessions.length == 0 || new Date() > new Date(JSON.parse(matchingSessions[0].session).cookie.expires))
    return false;

  const user = await client.db(dbName).collection(userCollectionName).find({_id: mongo.ObjectID(session.userId)}).toArray();
  if(user.length === 0)
    return false;

  session.username = user[0].username;
  return session;  
}

// Exporting user repo functions to be used in index
module.exports = {
  insertUser,
  getUsers,
  loginUser,
  deleteUser,
  updateUser,
  validateSession
};