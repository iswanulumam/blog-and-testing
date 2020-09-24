const { ObjectID } = require('mongodb');
const request = require('supertest');
const express = require('express');
const chai = require('chai');  
const expect = chai.expect;

const { Article } = require('./../models/article');
const app = require('./../app');

const { dummyArticle, dummyUser } = require('./seed');

/** remove all document before testing */
beforeEach((done) => {
  Article.remove({}).then(() => {
    return Article.insertMany(dummyArticle);
  }).then(() => done());
});

describe('GET /api/articles', () => {
  it('get all articles', (done) => {
    request(app)
      .get('/api/articles')
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect(200)
      .expect((result) => {
        expect(result.body.status).to.equal('oke');
        expect(result.body.data.length).to.equal(2);
      })
      .end(done);
  });
});

describe('POST /api/articles', () => {
  it('create a new article', (done) => {
    const title = 'This is title 3';
    const text = 'This is text 3';
    const imageUrl = 'https://storage.googleapis.com/blog-tdd/1526364444824iswanul-umam-3.jpg';
    request(app)
      .post('/api/articles')
      .set('x-auth', dummyUser[0].tokens[0].token)
      .send({ title, text, imageUrl })
      // .attach('image', 'tests/files/ask.jpg')
      .expect(201)
      .expect((result) => {
        expect(result.body.status).to.equal('oke');
        expect(result.body.data.text).to.equal(text);
      })
      .end((err, result) => {
        if (err) return done(err);
        Article.find({ title }).then((article) => {
          // expect(article.length).to.equal(1);
          // expect(article[0].text).to.equal(text);
        }).catch((e) => done(e));
        done();
      });
  });
  it('create article with invalid body data', (done) => {
    request(app)
      .post('/api/articles')
      .set('x-auth', dummyUser[0].tokens[0].token)
      .send({})
      .expect(400)
      .expect((result) => {
        expect(result.body.status).to.equal('error');
      })
      .end((err, result) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('GET /api/article/:id', () => {
  it('get todo by id', (done) => {
    const id = dummyArticle[0]._id.toHexString();
    request(app)
      .get(`/api/articles/${id}`)
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect(200)
      .expect((result) => {
        expect(result.body.status).to.equal('oke');
        expect(result.body.data.text).to.equal(dummyArticle[0].text);
      })
      .end(done);
  })
  it('return 404 if todo not found', (done) => {
    const id = new ObjectID().toHexString();
    request(app)
      .get(`/api/articles/${id}`)
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect(404)
      .expect((result) => {
        expect(result.body.status).to.equal('error');
      })
      .end(done);
  });
  it('return 404 if invalid objectId', (done) => {
    request(app)
      .get(`/api/articles/123`)
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect(404)
      .expect((result) => {
        expect(result.body.status).to.equal('error');
      })
      .end(done);
  });
});

describe('PATCH /api/article/:id', (done) => {
  it('update title', (done) => {
    const id = dummyArticle[0]._id.toHexString();
    const title = 'updated title';
    const text = 'updated text';
    request(app)
      .patch(`/api/articles/${id}`)
      .set('x-auth', dummyUser[0].tokens[0].token)
      .send({ title, text })
      .expect(200)
      .expect((result) => {
        expect(result.body.status).to.equal('oke');
        expect(result.body.data.title).to.equal(title);
        expect(result.body.data.text).to.equal(text);
      }).end(done);
  });
});

describe('DELETE /api/article/:id', () => {
  it('remove article', (done) => {
    const id = dummyArticle[1]._id.toHexString();
    request(app)
      .delete(`/api/articles/${id}`)
      .set('x-auth', dummyUser[1].tokens[0].token)
      .expect(200)
      .expect((result) => {
        expect(result.body.data._id).to.equal(id);
      })
      .end((err, result) => {
        if (err) return done(err);
        Article.findById(id).then((todo) => {
          expect(todo).to.be.null;
          done();
        }).catch((e) => done(e));
      });
  });
  it('remove not found', (done) => {
    const id = new ObjectID().toHexString();
    request(app)
      .delete(`/api/todos/${id}`)
      .set('x-auth', dummyUser[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
  it('remove invalid object', (done) => {
    request(app)
      .delete(`/api/todos/123`)
      .set('x-auth', dummyUser[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
});