var mongoose = require('mongoose');
var express = require('express');
var MongoStore = require('connect-mongo')(express);

var sessionStore = new MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/chat',});

module.exports = sessionStore;
