const router = require('express').Router();
const { users } = require('../services/user');
const usersSelectors = require('../services/usersSelectors');
const messagesSelectors = require('../services/messagesSelectors');
const messages = require('../services/messages');

router.post('/:senderName/:receiverName', (req, res) => {
  const { message, createdAt } = req.body;
  if (message === '' || message === undefined) {
    res.status(400).end();
    return;
  }
  const { senderName, receiverName } = req.params;
  const senderId = usersSelectors.findUserIdByName(senderName);
  const receiverId = usersSelectors.findUserIdByName(receiverName);
  if (!senderId) {
    res.status(400).send(`There is no such user: ${senderName}`);
    return;
  }
  if (!receiverId) {
    res.status(400).send(`There is no such user: ${receiverName}`);
    return;
  }
  messagesSelectors.addNewMessage(senderId, receiverId, message, createdAt);
  res.status(201).send('Message sent successfully!');
});

router.get('/:senderName/:receiverName', (req, res) => {
  const { senderName, receiverName } = req.params;
  const senderId = usersSelectors.findUserIdByName(senderName);
  const receiverId = usersSelectors.findUserIdByName(receiverName);
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

router.delete('/:senderName/:receiverName', (req, res) => {
  const messageCreationData = req.body.createdAt;
  const { senderName, receiverName } = req.params;
  const senderId = usersSelectors.findUserIdByName(senderName);
  const receiverId = usersSelectors.findUserIdByName(receiverName);
  messagesSelectors.deleteMessage(senderId, receiverId, Number(messageCreationData));
  res.status(400).send('Message deleted succesfully!');
});

module.exports = router;
