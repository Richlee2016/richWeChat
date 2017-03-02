"use strict"
var Koa = require('koa');
var path = require('path');
var router = require('koa-router')();
var config = require('./config');
var wechat = require('./wechat/generator');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');

var app = new Koa();
app.use(wechat(config.wechat));

app.listen(8080);
