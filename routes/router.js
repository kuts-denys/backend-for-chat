const router = require('express').Router();
const { messages, users, usersById } = require('../services/data');
const selectors = require('../services/selectors');

router.get('/', (req, res) => {
  res.status(200).json({
    users,
    messages,
    usersById,
  });
});

router.get('/:username', (req, res) => {
  const user = users[selectors.findUserIdByName(req.params.username)];
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

router.get('/:senderName/:receiverName', (req, res) => {
  const { senderName, receiverName } = req.params;
  const senderId = selectors.findUserIdByName(senderName);
  const receiverId = selectors.findUserIdByName(receiverName);
  const user = users[senderId];
  const receiver = users[receiverId];
  if (!user) {
    res.status(400).send(`There is no such user: ${senderName}`);
    return;
  }
  if (!receiver) {
    res.status(400).send(`There is no such user: ${receiverName}`);
    return;
  }
  const messagesHistory = messages.filter((message) => {
    return (senderId === message.senderId || senderId === message.receiverId) &&
           (receiverId === message.senderId || receiverId === message.receiverId);
  });
  messagesHistory.sort((a, b) => a.createdAt - b.createdAt);
  res.status(200).json({
    user,
    receiver,
    messagesHistory,
  });
});

router.post('/:senderName/:receiverName', (req, res) => {
  const { message, createdAt } = req.body;
  if (message === '' || message === undefined) {
    res.status(400).end();
    return;
  }
  const { senderName, receiverName } = req.params;
  const senderId = selectors.findUserIdByName(senderName);
  const receiverId = selectors.findUserIdByName(receiverName);
  if (!senderId) {
    res.status(400).send(`There is no such user: ${senderName}`);
    return;
  }
  if (!receiverId) {
    res.status(400).send(`There is no such user: ${receiverName}`);
    return;
  }
  selectors.addNewMessage(senderId, receiverId, message, createdAt);
  res.status(201).send('Message sent successfully!');
});

router.put('/:username', (req, res) => {
  const email = req.body.email;
  if (!email) res.status(400).send('Email adress is not provided');
  const username = req.params.username;
  const exists = selectors.checkIfUserExists(username);
  if (!exists) {
    selectors.createUser(username, email);
    res.status(201).send(`User ${username} created!`);
  } else {
    res.status(409).send('User with this nickname already exists');
  }
});

router.delete('/:username', (req, res) => {
  const username = req.params.username;
  const exists = selectors.checkIfUserExists(username);
  if (!exists) {
    res.status(400).send(`User ${username} doesn't exist`);
    return;
  }
  const userId = selectors.findUserIdByName(username);
  selectors.deleteUser(userId);
  res.status(200).send(`User ${username} deleted successfully`);
});

router.delete('/:senderName/:receiverName', (req, res) => {
  const messageCreationData = req.body.createdAt;
  const { senderName, receiverName } = req.params;
  const senderId = selectors.findUserIdByName(senderName);
  const receiverId = selectors.findUserIdByName(receiverName);
  selectors.deleteMessage(senderId, receiverId, Number(messageCreationData));
  res.status(400).send('Message deleted succesfully!');
});

module.exports = router;
