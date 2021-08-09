const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startClient} = require('./database/mongo');
const {insertUser, getUsers, loginUser, deleteUser, updateUser} = require('./database/users');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// GET: Return all users
app.get('/', async (req, res) => {
  res.send(await getUsers());
});

// POST: Login a user
app.post('/login', async (req, res) => {
  const userLogin = req.body;
  const response = await loginUser(userLogin);
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

// Starting the client and server
startClient().then(async () => {
  const port = 5001;
  app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
  });
});