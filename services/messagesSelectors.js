const messages = require('./messages');
const { users, usersById } = require('./user');
const usersSelectors = require('./usersSelectors');

function addNewMessage(senderId, receiverId, msg, createdAt = Date.now()) {
  const obj = {
    senderId,
    receiverId,
    body: msg,
    createdAt,
  };
  messages.push(obj);
  const sender = users[senderId];
  if (!sender.relatedUsersIds.includes(receiverId)) sender.relatedUsersIds.push(receiverId);
  const receiver = users[receiverId];
  if (!receiver.relatedUsersIds.includes(senderId)) receiver.relatedUsersIds.push(senderId);
}

function deleteMessage(senderId, receiverId, createdAt) {
  const messageIndex = messages.findIndex((message) => {
    return message.receiverId === receiverId && message.senderId === senderId && message.createdAt === createdAt;
  });
  messages.splice(messageIndex, 1);
  usersById.forEach((userId) => {
    users[userId].relatedUsersIds = usersSelectors.findRelatedUsers(userId);
  });
}

module.exports = {
  addNewMessage,
  deleteMessage,
};
