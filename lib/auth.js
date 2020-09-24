const { User } = require('./../models/user');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');
  User.findByToken(token)
    .then((user) => {
      if (!user) return Promise.reject();
      req.user = user;
      req.token = token;
      next();
    }).catch((e) => {
      res.status(401).send({
        status: 'unauthorized',
        data: [],
        message: 'permission denied',
      });
    })
}

const authorization = (req, res, next) => {
  const token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user || user.admin != true) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send({
      status: 'unauthorized',
      data: [],
      message: 'permission denied',
    });
  })
}

module.exports = {
  authenticate,
  authorization
}