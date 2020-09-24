## Blog-TDD app :memo:

[![Build Status](https://travis-ci.com/iswanulumam/blog-tdd.svg?token=phg4cxxqtEs42hsRYxcv&branch=master)](https://travis-ci.com/iswanulumam/blog-tdd)

[LINK DEPLOY](http://blog.iamsuperpowers.com)

Portofolio project Blog-TDD
- Note: client-side development put in directory `client-vue`

Run: `npm test`

<img src="http://sarahsplace.com.au/wp-content/uploads/2018/02/MADE-WITH-LOVE-800x675.jpg" width="200">

## Stack-tech :dart:

### back-end :wrench:
- [x] RESTful API Using Expressjs, MongoDB (M-Lab), Mongoose
- [x] TDD and Unit Test using Mocha & Chai
- [x] Mochawesome for Reporting [MOCHA REPORTER](https://blog-tdd-reporter.iamsuperpowers.com/)
- [x] Instanbul Coverage (90%)
- [x] Integration Test Using Travis-CI [TRAVIS-CI LINK](https://travis-ci.com/iswanulumam/blog-tdd)
- [x] GCP Cloud

### front-end :art:
- [x] Bootstrap
- [x] Vue.js
- [x] SPA (Vuex & VueRouter)

---

## RESTful API
[RESTful API blog apps](https://api.blog.iamsuperpowers.com/) `https://api.blog.iamsuperpowers.com/`

## Open Endpoints

Open endpoints require no Authentication.

* Login : `POST /api/login/`
* Create user : `POST /api/users/register`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* Show user detail : `GET /api/users/me`
* Delete user token : `DELETE /api/users/logout`

### Article related

Endpoints for viewing and manipulating the articles that the Authenticated User
has permissions to access.

* Show Accessible Article : `GET /api/articles/`
* Create Article : `POST /api/articles/`
* Show An Article : `GET /api/articles/:id/`
* Update An Article : `PATCH /api/articles/:id/`
* Delete An Article : `DELETE /api/articles/:id/`