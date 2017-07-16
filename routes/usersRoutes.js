const router = require('express').Router();
const { users, usersById } = require('../services/user');
const messages = require('../services/messages');
const usersSelectors = require('../services/usersSelectors');
const messagesSelectors = require('../services/messagesSelectors');

router.get('/', (req, res) => {
  res.status(200).json({
    users,
    messages,
    usersById,
  });
});

router.get('/:username', (req, res) => {
  const user = users[usersSelectors.findUserIdByName(req.params.username)];
  if (!user) res.status(400).send('There is no such user');
  let relatedUsersObj;
  if (user.relatedUsersIds.length) {
    relatedUsersObj = user.relatedUsersIds.map(relatedUserId => users[relatedUserId]);
  } else {
    relatedUsersObj = null;
  }
  res.status(200).json({
    user,
    allUsers: users,
    relatedUsers: relatedUsersObj,
  });
});


router.put('/:username', (req, res) => {
  const email = req.body.email;
  if (!email) res.status(400).send('Email adress is not provided');
  const username = req.params.username;
  const exists = usersSelectors.checkIfUserExists(username);
  if (!exists) {
    usersSelectors.createUser(username, email);
    res.status(201).send(`User ${username} created!`);
  } else {
    res.status(409).send('User with this nickname already exists');
  }
});


router.delete('/:username', (req, res) => {
  const username = req.params.username;
  const exists = usersSelectors.checkIfUserExists(username);
  if (!exists) {
    res.status(400).send(`User ${username} doesn't exist`);
    return;
  }
  const userId = usersSelectors.findUserIdByName(username);
  usersSelectors.deleteUser(userId);
  res.status(200).send(`User ${username} deleted successfully`);
});

module.exports = router;
