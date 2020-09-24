const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/user');
const { authenticate } = require('./../lib/auth');
const { User } = require('./../models/user');

router.post('/register', UserController.insert);

router.get('/me', authenticate, (req, res) => {
  res.status(200).send({
    status: 'oke',
    data: req.user,
    message: [],
  });
});

router.post('/login', (req, res) => {  
  let values = req.body;
  User.findByCredentials(values.email, values.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).status(200).send({
        status: 'oke',
        data: user,
        message: 'login success',
      })
    })
  }).catch((e) => {
    res.status(400).send({
      status: 'error',
      data: [],
      message: 'login failed',
    });
  })
});

router.delete('/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send({
      status: 'oke',
      data: [],
      message: 'logout success',      
    })
  }).catch((e) => {
    res.status(400).send({
      status: 'error',
      data: [],
      message: 'logout failed',
    })
  })
});

module.exports = router;
