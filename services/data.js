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

const messages = [
  {
    senderId: '1',
    receiverId: '2',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique aut quas, veniam accusantium adipisci culpa.',
    createdAt: 1500031478184,
  },
  {
    senderId: '2',
    receiverId: '3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, voluptatibus.',
    createdAt: 1499931478184,
  },
];

module.exports = {
  users,
  messages,
  usersById,
};
