const { ObjectID } = require('mongodb');
const request = require('supertest');
const express = require('express');
const chai = require('chai');
const expect = chai.expect;

const { User } = require('./../models/user');
const app = require('./../app');

const { dummyUser } = require('./seed');

const populateUser = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(dummyUser[0]).save();
    let userTwo = new User(dummyUser[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
}

/** seed db for testing */
beforeEach(populateUser);

describe('POST /api/users/register', () => {
  
  it('create a new user', (done) => {
    const username = 'user126';
    const email = 'user126@gmail.com';
    const password = 'user126';
    request(app)
      .post('/api/users/register')
      .send({ username, email, password })
      .expect(201)
      .expect((result) => {
        expect(result.headers['x-auth']).to.exist;
        expect(result.body.data._id).to.exist;
        expect(result.body.data.email).to.equal(email);
      })
      .end((err, result) => {
        if (err) return done(err);

        User.findOne({ username, email }).then((user) => {
          expect(user).to.exist;
          expect(user.password).to.not.equal(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('return validation invalid input', (done) => {
    request(app)
      .post('/api/users/register')
      .send({})
      .expect(400)
      .end(done);
  });

  it('return validation error email in user', (done) => {
    const username = 'user127';
    const email = dummyUser[0].email;
    const password = 'user127';
    request(app)
      .post('/api/users/register')
      .send({ username, email, password })
      .expect(400)
      .end(done);
  });

  it('return validation error email invalid', (done) => {
    const username = 'user127';
    const email = 'user127gmail.com';
    const password = 'user127';
    request(app)
      .post('/api/users/register')
      .send({ username, email, password })
      .expect(400)
      .end(done);
  });

  it('return validation error password invalid', (done) => {
    const username = 'user128';
    const email = 'user128gmail.com';
    const password = 'without_number';
    request(app)
      .post('/api/users/register')
      .send({ username, email, password })
      .expect(400)
      .end(done);
  });
});

describe('GET /api/users/me', () => {
  it('return 401 not authenticated', (done) => {
    request(app)
      .get('/api/users/me')
      .expect(401)
      .expect((result) => {
        expect(result.body).to.deep.equal({
            "data": [],
            "message": "permission denied",
            "status": "unauthorized",
          });
      })
      .end(done);
  })
  it('return user if authenticated', (done) => {
    request(app)
      .get('/api/users/me')
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect((result) => {
        expect(result.body.data._id).to.equal(dummyUser[0]._id.toHexString());
        expect(result.body.data.email).to.equal(dummyUser[0].email);
      })
      .end(done);
  })
});

describe('POST /api/users/login', () => {
  it('login user return auth token', (done) => {
    request(app)
      .post('/api/users/login')
      .send({
        email: dummyUser[1].email,
        password: dummyUser[1].password,
      })
      .expect(200)
      .expect((result) => {
        expect(result.headers['x-auth']).to.exist;
      })
      .end((err, result) => {
        if (err) return done(err);
        User.findById(dummyUser[1]._id).then((user) => {
          expect(user.tokens[1].token).to.equal(result.headers['x-auth']);
          done();
        }).catch((e) => done(e));
      })
  })

  it ('reject invalid login', (done) => {
    request(app)
      .post('/api/users/login')
      .send({
        email: dummyUser[1].email,
        password: dummyUser[1].password + 'abc',
      })
      .expect(400)
      .expect((result) => {
        expect(result.headers['x-auth']).to.not.exist;
      })
      .end((err, result) => {
        if (err) return done(err);
        User.findById(dummyUser[1]._id).then((user) => {
          expect(user.tokens.length).to.equal(1);
          done();
        }).catch((e) => done(e));
      })
  });
});

describe('DELETE /api/users/logout', () => {
  it('remove auth token logout', (done) => {
    request(app)
      .delete('/api/users/logout')
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        User.findById(dummyUser[0]._id).then((user) => {
          expect(user.tokens.length).to.equal(0);
          done();
        }).catch((e) => done(e));
      });
  })
})