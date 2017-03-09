"use strict"
var Promise = require('bluebird');
var fs = require('fs');
var request = Promise.promisify(require('request'));
var util = require('./util');
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
    accessToken: prefix + 'token?grant_type=client_credential',
    upload:{
        temporary:prefix + 'media/upload?'
    }

}
var Wechat =function(opts){
            var that = this;
            this.appID= opts.appID;
            this.appSecret= opts.appSecret;
            this.getAccessToken= opts.getAccessToken;
            this.saveAccessToken = opts.saveAccessToken;
            this.haveAccessToken();
        };
//验证票据是否过期
Wechat.prototype.isValidAccessToken = function(data){
    if(!data || !data.access_token || !data.expires_in){
        return false;
    };
    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());

    if(now < expires_in){
        return true;
    }else{
        return false;
    };
};
//更新票据
Wechat.prototype.updateAccessToken = function(data){
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;

    return new Promise(function(resolve,reject){
        request({url:url, json:true}).then(function(response){
            var data = response.body;
            var now = (new Date().getTime());
            //-20  处理一些延迟
            var expires_in = now + (data.expires_in - 20) * 1000;
            data.expires_in = expires_in;
            resolve(data);
        });
    });
};
//获取accessToken并保存
Wechat.prototype.haveAccessToken = function(){
    var that = this;
    if(this.access_token && this.expires_in){
        if(this.isValidAccessToken(this)){
            return Promise.resolve(this);
        };
    };
    return that.getAccessToken()
            .then(function(data){
                try {
                    data = JSON.parse(data)
                }
                catch(e){
                    return that.updateAccessToken()
                }
                if (that.isValidAccessToken(data)){
                    return Promise.resolve(data);
                }else{
                    return that.updateAccessToken()
                }
            })
            .then(function(data){
                that.access_token = data.access_token;
                that.expires_in = data.expires_in;
                that.saveAccessToken(data);
                return Promise.resolve(data);
            });

};

//上传
Wechat.prototype.uploadSource = function(type, filepath){
    var that = this;
    var url = api.upload.temporary;
    var type = type;
    var form = {
        media:fs.createReadStream(filepath)
    }
    return new Promise(function(resolve, reject){
        that.haveAccessToken()
        .then(function(data){
                var urlPost =`${url}access_token=${data.access_token}&type=${type}`
                request({method:'POST', url:urlPost, formData: form, json:true}).then(function(response){
                    var _data = response.body;
                    if(_data){
                        resolve(_data);
                    }else{
                        throw new Error('Unload fails');
                    };
                })
                .catch(function(err){
                        reject(err)
                });
        })
    });
};

//微信回复
Wechat.prototype.reply = function(){
    var content = this.body;
    var message = this.weixinMsg;
    var xml = util.tpl(content,message);
    this.status = 200;
    this.type = 'application/xml';
    this.body=xml;
};
module .exports= Wechat;