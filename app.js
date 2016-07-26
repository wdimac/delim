var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var fs = require("fs");
var browserify = require("browserify");
browserify("./public/components/main.jsx")
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(fs.createWriteStream("./public/javascript/main.js"));

// load data from github
var delim = require('./util/delim');
delim.load();

var routes = require('./routes/index');
var delimiter = require('./routes/delimiter');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/delimiters', delimiter);

module.exports = app;
