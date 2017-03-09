"use strict"
var path = require('path');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');
//΢配置config
var config = {
    wechat: {
        appID:'wxa74fa379e56fc98a',
        appSecret:'51e021265600de8df53077641d27e5ad',
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

module .exports = config;