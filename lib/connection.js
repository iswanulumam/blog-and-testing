const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds157078.mlab.com:57078/blog', function (err) {
  if (err) return console.log('failed connect to db :(');
  console.log('<3 i love coding <3 _');
});

module.exports = { mongoose };