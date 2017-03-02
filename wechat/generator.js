"use strict"
var sha1 = require('sha1');
//解析 url 中xml 内容
var getRawBody = require('raw-body');
var Wechat = require('./wechat');
var util = require('./util');
module.exports = function (opts){
    var that = this;
    return function *(next){
        this.set('Cache-Control','no-cache');
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        //解密
        var str = [token,timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if(this.method === 'GET'){
            if(sha === signature){
                this.body = echostr + '';
            }else{
                this.body = 'wrong';
            };
        }else if(this.method === 'POST'){
            if(sha !== signature){
                this.body='wrong';
                return false;
            };
            //URL 解析xml (raw-body)
            var data = yield getRawBody(this.req,{
                length:this.length,
                limit:'1mb',
                encoding:this.charset
            })

            //解析xml (xml2js)
            var content = yield util.parseXMLAsync(data);
            //回复
            var message = util.formatMessage(content.xml);
            console.log(message);
            if(message.MsgType === 'event'){
                if(message.Event === 'subscribe'){
                    var now = new Date().getTime();
                    this.status = 200;
                    this.type = 'application/xml';
                    this.body=`<xml><ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                    <CreateTime>${now}</CreateTime>
                    <MsgType><![CDATA[text]]></MsgType>
                    <Content><![CDATA[欢迎来到Rich的小屋]]></Content>
                    </xml>`
                    return;
                };
            };
        };
    };
}

