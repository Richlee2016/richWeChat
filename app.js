"use strict"
var Koa = require('koa');
var router = require('koa-router')();
var config = require('./config');
var wechat = require('./wechat/generator');
var weixin = require('./weixin');
var util = require('./libs/util');


var app = new Koa();
app.use(wechat(config.wechat, weixin.reply));

app.listen(8080);
