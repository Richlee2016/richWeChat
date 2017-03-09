"use strict"

var xml2js = require('xml2js');
var  Promise = require('bluebird');
var tpl = require('./template');
// XMLjs  解析xml
exports.parseXMLAsync = function (xml){
    return new Promise(function(resolve, reject){
        xml2js.parseString(xml, {trim:true}, function(err, content){
            if(err){
                reject(err);
            }else{
                resolve(content);
            };
        })
    });
};

//xml  简化xml格式 解决嵌套问题
function formatMessage(result){
    var message = {};
    if(typeof result === 'object'){
        var keys = Object.keys(result);
        for(var i=0; i<keys.length; i++){
            var item = result[keys[i]];
            var key = keys[i];
            if(!(item instanceof Array) || item.length === 0 ){
                continue;
            };
            if(item.length === 1){
                var val = item[0];
                if(typeof val === 'object'){
                    message[key] = formatMessage(val);
                }else{
                    message[key] = (val || '').trim();
                };
            }else{
                message[key] = []
                for(var j; j<item.length; j++){
                    message[key].push(formatMessage(item[j]));
                }
            };
        };
    };
    return message;
};
exports.formatMessage = formatMessage;

//模板解析回复xml
exports.tpl = function(content, message){
    var info = {};
    var type = 'text';
    var fromUserName = message.FromUserName;
    var toUserName = message.ToUserName;
    if(Array.isArray(content)){
        type = 'news';
    };
    type = content.type || type;
    info.content = content;
    info.msgType = type;
    info.createTime = new Date().getTime();
    info.toUserName = fromUserName;
    info.fromUserName = toUserName;
    info.mediaId = content.mediaId;
    info.musicUrl = content.musicUrl;
    info.title = content.title;
    info.description = content.description;
    info.hqMusicUrl = content.hqMusicUrl || "";
    return tpl.compiled(info);
};