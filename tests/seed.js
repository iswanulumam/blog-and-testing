const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const userId_1 = new ObjectID();
const userId_2 = new ObjectID();

const dummyUser = [
  {
    _id: userId_1,
    username: 'user123',
    email: 'user123@gmail.com',
    password: 'user123',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userId_1,
        username: 'user123',
        email: 'user123@gmail.com',
        access: 'auth', 
        }, process.env.JWT_SECRET).toString()
    }],
  },
  {
    _id: userId_2,
    username: 'user125',
    email: 'user125@gmail.com',
    password: 'user125',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userId_2,
        username: 'user125',
        email: 'user125@gmail.com',
        access: 'auth', 
        }, process.env.JWT_SECRET).toString()
    }],
  }
];

const dummyArticle = [{
  _id: new ObjectID(),
  title: 'Title 1 dummy for testing',
  text: 'Text todo 1',
  imageUrl: 'https://storage.googleapis.com/blog-tdd/1526364444824iswanul-umam-3.jpg',
  _creator: userId_1,
}, {
  _id: new ObjectID(),
  title: 'Title 2 dummy for testing',
  text: 'Text todo 2',
  imageUrl: 'https://storage.googleapis.com/blog-tdd/1526364444824iswanul-umam-3.jpg',
  _creator: userId_2
}];

module.exports = {
  dummyUser,
  dummyArticle,
}