"use strict"
var Koa = require('koa');
var path = require('path');
var router = require('koa-router')();
var wechat = require('./wechat/generator');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');
//øÁ”Ú«Î«Û
var app = new Koa();

//Œ¢–≈config
var config = {
    wechat: {
        appID:'wx71706017cef3d96d',
        appSecret:'75d1f41637f8609fc5868595cbb35817',
        token:'Rich19Lee90Love04you03',
        getAccessToken:function(){
            return util.readFileAsync(wechat_file,"utf8");
        },
        saveAccessToken:function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file,data);
        }
    }
};
app.use(wechat(config.wechat));


app.use(router.routes());
app.listen(8080);
