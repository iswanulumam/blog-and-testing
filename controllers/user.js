const { ObjectID } = require('mongodb');
const { User } = require('./../models/user');
const _ = require('lodash');

const UserController = {
  insert(req, res) {
    const values = req.body;
    const user = new User(values);
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).status(201).send({
        status: 'oke',
        data: user,
        message: [],
      })
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        data: [],
        message: e.message,
      });
    })
  }
}

module.exports = UserController;