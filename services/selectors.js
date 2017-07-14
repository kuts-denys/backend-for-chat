const { messages, users, usersById } = require('./data');
const uniqid = require('uniqid');

function findUserIdByName(username) {
  return usersById.filter(userId => users[userId].username === username)[0];
}

function findAllById(id) {
  if (!messages.length) return [];
  return messages.filter(message => message.senderId === id);
}

function findRelatedUsers(id) {
  if (!messages.length) return [];
  const filteredArray = messages.filter(message => id === message.senderId || id === message.receiverId);
  return filteredArray.map((message) => {
    if (id === message.senderId) return message.receiverId;
    if (id === message.receiverId) return message.senderId;
  });
}

function checkIfUserExists(username) {
  let exists = false;
  usersById.forEach((userId) => {
    if (users[userId].username === username) exists = true;
  });
  return exists;
}

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

function createUser(username, email) {
  const id = uniqid();
  users[id] = {
    username: username.toLowerCase(),
    email,
    relatedUsersIds: findRelatedUsers(id),
  };
  usersById.push(id);
}

function deleteUser(id) {
  delete users[id];
  const index = usersById.findIndex(userId => userId === id);
  if (index !== -1) usersById.splice(index, 1);
  usersById.forEach((userId) => {
    const relatedIds = users[userId].relatedUsersIds;
    if (relatedIds !== null && relatedIds.length !== 0) {
      const index = relatedIds.findIndex(relatedUserId => relatedUserId === id);
      if (index !== -1) relatedIds.splice(index, 1);
    }
  });
}

function deleteMessage(senderId, receiverId, createdAt) {
  const messageIndex = messages.findIndex((message) => {
    return message.receiverId === receiverId && message.senderId === senderId && message.createdAt === createdAt;
  });
  messages.splice(messageIndex, 1);
  usersById.forEach((userId) => {
    users[userId].relatedUsersIds = findRelatedUsers(userId);
  });
}

module.exports = {
  findAllById,
  findRelatedUsers,
  addNewMessage,
  createUser,
  findUserIdByName,
  checkIfUserExists,
  deleteUser,
  deleteMessage,
};
