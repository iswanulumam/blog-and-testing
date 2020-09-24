const { ObjectID } = require('mongodb');
const { Article } = require('./../models/article');
const _ = require('lodash');

const ArticleController = {
  create(req, res) {
    const values = req.body;
    const article = new Article({
      title: values.title,
      text: values.text,
      imageUrl: values.imageUrl,
      _creator: req.user._id,
    });
    article.save().then(article => {
      res.status(201).send({
        status: 'oke',
        data: article,
        message: [],
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        data: [],
        message: e.message,
      });
    })
  },

  // insert(req, res) {
  //   const values = req.body;
  //   const article = new Article({
  //     title: values.title,
  //     text: values.text,
  //     // imageUrl: req.file.cloudStoragePublicUrl,
  //     _creator: req.user._id,
  //   });
  //   article.save().then(article => {
  //     res.status(201).send({
  //       status: 'oke',
  //       data: article,
  //       message: [],
  //     });
  //   }).catch((e) => {
  //     res.status(400).send({
  //       status: 'error',
  //       data: [],
  //       message: e.message,
  //     });
  //   })
  // },

  find(req, res) {
    Article.find({})
    .populate('_creator', 'username')
    .then((articles) => {
      res.status(200).send({
        status: 'oke',
        data: articles,
        message: [],
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        data: [],
        message: e.message,
      });
    });
  },

  findOne(req, res) {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send({
        status: 'error',
        data: [],
        message: 'not found',
      });
    }
    Article.findOne({
      _id: id
    }).then((article) => {
      if (!article) {
        return res.status(404).send({
          status: 'error',
          data: [],
          message: 'not found',
        });
      }
      res.status(200).send({
        status: 'oke',
        data: article,
        message: [],
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        data: [],
        message: e.message,
      });
    })
  },

  update(req, res) {
    const id = req.params.id;
    const values = _.pick(req.body, ['title', 'text', 'imageUrl']);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({
        status: 'error',
        data: [],
        message: 'not found',
      });
    }

    Article.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: values }, { new: true }).then((article) => {
      if (!article) {
        return res.status(404).send({
          status: 'error',
          data: [],
          message: 'not found',
        });
      }
      res.status(200).send({
        status: 'oke',
        data: article,
        message: [],
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        data: [],
        message: e.message,
      });
    });
  },

  delete(req, res) {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({
        status: 'error',
        data: [],
        message: 'not found',
      });
    }

    Article.findOneAndRemove({
      _id: id,
      _creator: req.user._id,
    }).then((article) => {
      if (!article) {
        return res.status(404).send({
          status: 'error',
          data: [],
          message: 'not found',
        });
      }
      res.status(200).send({
        status: 'oke',
        data: article,
        message: [],
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        data: [],
        message: e.message,
      });
    });
  },
}

module.exports = ArticleController;