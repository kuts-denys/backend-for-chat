const users = {
  '1': {
    username: 'jumbo',
    email: 'jumbo@gmail.com',
    relatedUsersIds: ['2'],
  },
  '2': {
    username: 'silly',
    email: 'silly@gmail.com',
    relatedUsersIds: ['1', '3'],
  },
  '3': {
    username: 'piggy',
    email: 'piggy@gmail.com',
    relatedUsersIds: ['2'],
  },
  '4': {
    username: 'dapper',
    email: 'dapper@gmail.com',
    relatedUsersIds: [],
  },
  '5': {
    username: 'snowflake',
    email: 'snowflake@gmail.com',
    relatedUsersIds: [],
  },
};

const usersById = Object.keys(users);

module.exports = {
  users,
  usersById,
};
