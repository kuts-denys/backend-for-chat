const { users, usersById } = require('./user');
const messages = require('./messages');
const uniqid = require('uniqid');

function findUserIdByName(username) {
  return usersById.filter(userId => users[userId].username === username)[0];
}

function checkIfUserExists(username) {
  let exists = false;
  usersById.forEach((userId) => {
    if (users[userId].username === username) exists = true;
  });
  return exists;
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

module.exports = {
  findUserIdByName,
  checkIfUserExists,
  findAllById,
  findRelatedUsers,
  createUser,
  deleteUser,
};
