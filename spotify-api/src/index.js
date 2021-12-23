const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startClient} = require('./database/mongo');
const {insertUser, getUsers, loginUser, deleteUser, updateUser, validateSession} = require('./database/users');
const {insertRawData, retrieveRawData, insertArtistData} = require('./database/streamingData');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const config = require('../config.json');
const MongoStore = require('connect-mongo');
const e = require('express');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://localhost:8080'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));
app.use(morgan('combined'));
app.use(cookieParser());
const sessionMaxAge = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: config.sessionSecret,
  saveUninitialized: true,
  cookie: {maxAge: sessionMaxAge},
  resave: false,
  store: new MongoStore({
    mongoUrl: config.mongoUserURI,
    autoRemove: 'native'
  })
}));

// GET: Logging in user with cookie if possible, destroying cookie if not possible
app.get('/', async (req, res) => {
  const response = await validateSession(req.session);
  if(response){
    res.send(response);
  } else {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.send();    
  }
});

// POST: Login a user
app.post('/login', async (req, res) => {
  const userLogin = req.body;
  const userSession = req.session;
  const response = await loginUser(userLogin, userSession);
  res.send(response)
});

// POST: Create a user
app.post('/signup', async (req, res) => {
  const newUser = req.body;
  res.send(await insertUser(newUser));
});

// DELETE: Delete a user
app.delete('/:id', async (req, res) => {
  await deleteUser(req.params.id);
  res.send({ message: 'User removed.' });
});

// UPDATE: Update a user
app.put('/:id', async (req, res) => {
  const updatedUser = req.body;
  await updateUser(req.params.id, updatedUser);
  res.send({ message: 'User updated.' });
});

// POST: Logout user
app.post('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send();
});

// POST: Post user's streaming data JSON
app.post('/rawData', async (req, res) => {
  const rawData = req.body;
  res.send(await insertRawData(rawData));  
});

// GET: Get user's raw streaming data
app.get('/rawData/:id', async (req, res) => {
  res.send(await retrieveRawData(req.params.id));  
});

// Starting the client and server
startClient().then(async () => {
  const port = 5001;
  app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
  });
});